import StreamView from "@/app/components/StreamView";

export default function page({
  params: { creatorId },
}: {
  params: {
    creatorId: string;
  };
}) {
  return (
    <>
      <StreamView creatorId={creatorId} />
    </>
  );
}
