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

  const votesFilePath = path.join(process.cwd(), "data", id, "votes.txt");
  const orderFilePath = path.join(
    process.cwd(),
    "data",
    id,
    "displayOrder.txt"
  );
  const displayOrder = fs.readFileSync(orderFilePath, "utf-8");

  if (vote === 1) {
    const votedFor = JSON.parse(displayOrder)[0];
    fs.appendFileSync(votesFilePath, `${votedFor}\n`);
  } else if (vote === 2) {
    const votedFor = JSON.parse(displayOrder)[1];
    fs.appendFileSync(votesFilePath, `${votedFor}\n`);
  } else if (vote === 3) {
    const votedFor = JSON.parse(displayOrder)[2];
    fs.appendFileSync(votesFilePath, `${votedFor}\n`);
  }

  const frameMetadata = getFrameMetadata({
    accepts: { xmtp: "2024-02-09" },
    isOpenFrame: true,
    buttons: [
      {
        label: "See Correct Answer",
        action: "post",
        target: `${process.env.NEXT_PUBLIC_BASE_URL}/thirdFrame?id=${id}`,
      },
    ],
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/secondFrame?id=${id}`,
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
