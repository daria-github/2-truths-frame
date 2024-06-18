import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import CopyButton from "../components/CopyButton";

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
    <div className="flex min-h-full flex-col justify-center h-screen px-6 py-2 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm m-auto">
        <img
          className="mx-auto h-10 w-auto"
          src="https://xmtp.org/img/builtWithXmtp/xmtp.svg"
          alt="XMTP Logo"
        />
        <h1 className="mt-4 mb-6 text-center text-3xl font-bold leading-9 text-white">
          You've created your 2 Truths and a Lie!
        </h1>
        <CopyButton />
      </div>
    </div>
  );
};

export default FirstFrame;
