"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import StreamView from "../components/StreamView";

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

const creatorId = "3ce10574-0396-43ac-8274-02882cde607b";

export default function Component() {
  return <StreamView creatorId={creatorId} playVideo={true} />;
}
