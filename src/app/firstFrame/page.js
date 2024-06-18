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
        <button
          type="button"
          className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
            />
          </svg>
          Copy Frame link
        </button>
      </div>
    </div>
  );
};

export default FirstFrame;
