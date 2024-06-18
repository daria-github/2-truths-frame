import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import fs from "fs";
import path from "path";

export let metadata = {
  title: "Two Truths and a Lie Frame",
  description: "Results",
};

const SecondFrame = (props) => {
  const vote = Number(props.searchParams.vote);
  const id = props.searchParams.id;
  const parsedData = JSON.parse(decodeURI(data));

  const dataDirectory = path.join(process.cwd(), "data", id);
  const votesFilePath = path.join(process.cwd(), "data", id, "votes.txt");

  // Ensure the data directory exists
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory);
  }

  fs.appendFileSync(filePath, `${vote}`);

  const frameMetadata = getFrameMetadata({
    accepts: { xmtp: "2024-02-09" },
    isOpenFrame: true,
    buttons: [
      {
        label: "See Correct Answer",
        action: "post",
        target: `${process.env.NEXT_PUBLIC_BASE_URL}/thirdFrame?data=${data}`,
      },
    ],
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/secondFrame?data=${data}`,
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

export default SecondFrame;
