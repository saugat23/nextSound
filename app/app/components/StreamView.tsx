"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
//@ts-ignore
import {
  ChevronUp,
  ChevronDown,
  ThumbsDown,
  Play,
  Share2,
  Axis3DIcon,
  SkipForward,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import Navbar from "../components/Navbar";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
//@ts-ignore
import YouTubePlayer from "youtube-player";
import Image from "next/image";
import { YT_REGEX } from "../lib/utils";

interface Video {
  id: string;
  type: string;
  url: string;
  extractedId: string;
  title: string;
  smallImg: string;
  bigImg: string;
  active: boolean;
  userId: string;
  upvotes: number;
  haveUpvoted: boolean;
}

const REFRESH_INTERVAL_MS = 10 * 1000;

export default function StreamView({
  creatorId,
  playVideo = false,
}: {
  creatorId: string;
  playVideo: boolean;
}) {
  const [inputLink, setInputLink] = useState("");
  const [queue, setQueue] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [playNextLoader, setPlayNextLoader] = useState(false);
  const videoPlayerRef = useRef<HTMLDivElement>();

  async function refreshStreams() {
    const res = await fetch(`/api/streams/?creatorId=${creatorId}`, {
      credentials: "include",
    });
    const json = await res.json();
    setQueue(
      json.streams.sort((a: any, b: any) => (a.upvotes < b.upvotes ? 1 : -1))
    );

    setCurrentVideo((video) => {
      if (video?.id === json.activeStream?.stream?.id) {
        return video;
      }
      return json.activeStream.stream;
    });
  }

  useEffect(() => {
    refreshStreams();
    const interval = setInterval(() => {
      refreshStreams();
    }, REFRESH_INTERVAL_MS);
  }, []);

  useEffect(() => {
    if (!videoPlayerRef.current) {
      return;
    }
    let player = YouTubePlayer(videoPlayerRef.current);

    // 'loadVideoById' is queued until the player is ready to receive API calls.
    player.loadVideoById(currentVideo?.extractedId);

    // 'playVideo' is queue until the player is ready to received API calls and after 'loadVideoById' has been called.
    player.playVideo();
    function eventHandler(event: any) {
      console.log(event);
      console.log(event.data);
      if (event.data === 0) {
        playNext();
      }
    }
    player.on("stateChange", eventHandler);
    return () => {
      player.destroy();
    };
  }, [currentVideo, videoPlayerRef]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/streams/", {
      method: "POST",
      body: JSON.stringify({
        creatorId,
        url: inputLink,
      }),
    });
    setQueue([...queue, await res.json()]);
    setLoading(false);
    setInputLink("");
  };

  const handleVote = (id: string, isUpvote: boolean) => {
    setQueue(
      queue
        .map((video) =>
          video.id === id
            ? {
                ...video,
                upvotes: isUpvote ? video.upvotes + 1 : video.upvotes - 1,
                haveUpvoted: !video.haveUpvoted,
              }
            : video
        )
        .sort((a, b) => b.upvotes - a.upvotes)
    );

    fetch(`/api/streams/${isUpvote ? "upvote" : "downvote"}`, {
      method: "POST",
      body: JSON.stringify({
        streamId: id,
      }),
    });
  };

  const playNext = async () => {
    if (queue.length > 0) {
      try {
        setPlayNextLoader(true);
        const data = await fetch("/api/streams/next", {
          method: "GET",
        });
        const json = await data.json();
        setCurrentVideo(json.stream);
        setQueue((q) => q.filter((x) => x.id !== json.stream?.id));
      } catch (e) {}
      setPlayNextLoader(false);
    }
  };

  const handleShare = () => {
    const shareableLink = `${window.location.hostname}/creator/${creatorId}`;
    navigator.clipboard.writeText(shareableLink).then(
      () => {
        toast.success("Link copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy link. Please try again.");
      }
    );
  };
  return (
    <>
      <Toaster richColors position="top-right" expand />
      <Navbar />
      <div className="w-full max-w-[1200px] mx-auto p-4 space-y-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Song Voting Queue</h1>
          <Button
            type="submit"
            onClick={handleShare}
            className="ml-auto float-right"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Submit New Video */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            type="text"
            placeholder="Enter YouTube URL"
            value={inputLink}
            onChange={(e) => setInputLink(e.target.value)}
          />
          <Button disabled={loading} onClick={handleSubmit} type="submit">
            {loading ? "Loading..." : "Add to Queue"}
          </Button>
        </form>

        {/* Video Preview */}
        {inputLink && inputLink.match(YT_REGEX) && !loading && (
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">Preview:</h2>
              <LiteYouTubeEmbed title="" id={inputLink.split("?v=")[1]} />
            </CardContent>
          </Card>
        )}

        {/* Queue */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Songs</h2>
          {queue.map((video) => (
            <Card key={video.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={video.smallImg}
                    alt={video.title}
                    width={120}
                    height={90}
                    className="rounded-md"
                  />
                  <span className="font-medium">{video.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleVote(video.id, video.haveUpvoted ? false : true)
                    }
                    className="flex items-center space-x-1"
                  >
                    {video.haveUpvoted ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronUp className="w-4 h-4" />
                    )}
                    <span>{video.upvotes}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Currently Playing Video */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Now Playing</h2>
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${queue[0]?.id}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex justify-center py-5 items-center">
            <Button onClick={playNext} disabled={queue.length <= 1}>
              <SkipForward className="w-4 h-4 mr-2" />
              Play Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
