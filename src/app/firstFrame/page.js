import { getFrameMetadata } from "@coinbase/onchainkit/frame";

export let metadata = {
  title: "Two Truths and a Lie Frame",
  description: "Which is the lie?!",
};

const FirstFrame = (props) => {
  const data = props.searchParams.data;
  const frameMetadata = getFrameMetadata({
    accepts: { xmtp: "2024-02-09" },
    isOpenFrame: true,
    buttons: [
      {
        label: "1",
        action: "post",
        target: `${process.env.NEXT_PUBLIC_BASE_URL}/secondFrame?vote=1&data=${data}`,
      },
      {
        label: "2",
        action: "post",
        target: `${process.env.NEXT_PUBLIC_BASE_URL}/secondFrame?vote=2&data=${data}`,
      },
      {
        label: "3",
        action: "post",
        target: `${process.env.NEXT_PUBLIC_BASE_URL}/secondFrame?vote=3&data=${data}`,
      },
    ],
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/firstFrame?data=${data}`,
  });

  metadata = {
    ...metadata,
    other: {
      ...frameMetadata,
    },
  };

  return (
    <div>
      <h1>Open Frames Two Truths and a Lie Frame</h1>
    </div>
  );
};

export default FirstFrame;
