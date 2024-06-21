import { getFrameMetadata } from "@coinbase/onchainkit/frame";

export let metadata = {
  title: "Two Truths and a Lie Frame",
  description: "Results",
};

const ThirdFrame = (props) => {
  const id = props.searchParams.id;

  const frameMetadata = getFrameMetadata({
    accepts: { xmtp: "2024-02-09" },
    isOpenFrame: true,
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/thirdFrame?id=${id}`,
  });

  metadata = {
    ...metadata,
    other: {
      ...frameMetadata,
    },
  };

  return (
    <div>
      <h1>Open Frames Two Truths and a Lie Frame Results</h1>
    </div>
  );
};

export default ThirdFrame;
