import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import { useMemo } from "react";
export let metadata = {
  title: "Two Truths and a Lie Frame",
  description: "Results",
};

const SecondFrame = (props) => {
  const vote = Number(props.searchParams.vote);
  const id = props.searchParams.id;

  // Use useMemo to ensure getFrameMetadata is only called once
  const frameMetadata = useMemo(
    () =>
      getFrameMetadata({
        accepts: { xmtp: "2024-02-09" },
        isOpenFrame: true,
        buttons: [
          {
            label: "See Correct Answer",
            action: "post",
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/thirdFrame?id=${id}`,
          },
        ],
        image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/secondFrame?id=${id}&vote=${vote}`,
      }),
    [id, vote]
  );

  metadata = useMemo(
    () => ({
      ...metadata,
      other: {
        ...frameMetadata,
      },
    }),
    [frameMetadata]
  );

  return (
    <div>
      <h1>Open Frames Two Truths and a Lie Frame Results</h1>
    </div>
  );
};

export default SecondFrame;
