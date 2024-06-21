import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import { kv } from "@vercel/kv";
import { unstable_noStore as noStore } from "next/cache";

export let metadata = {
  title: "Two Truths and a Lie Frame",
  description: "Results",
};

const SecondFrame = (props) => {
  const vote = Number(props.searchParams.vote);
  const id = props.searchParams.id;

  console.log("ID IN SECOND FRAME", id);
  const updateVals = async () => {
    console.log("BEFORE DISPLAY ORDER");
    const displayOrder = await kv.get(id, "displayOrder");
    console.log("AFTER DISPLAY ORDER", displayOrder);

    try {
      noStore();
      let votedFor;
      if (vote === 1) {
        votedFor = displayOrder[0];
      } else if (vote === 2) {
        votedFor = displayOrder[1];
      } else if (vote === 3) {
        votedFor = displayOrder[2];
      }

      console.log("VOTED FOR", votedFor);
      const currentVals = await kv.hgetall(id);
      console.log("CURRENT VALS", currentVals);
      const fieldKey = `${votedFor}Votes`;
      const currentVotes = currentVals[fieldKey];
      const newVoteCount = currentVotes + 1;

      await kv.hset(id, {
        [fieldKey]: newVoteCount,
      });

      // Force refresh after setting
      noStore();
      const updatedData = await kv.hgetall(id);
      console.log("UPDATED DATA", updatedData);
    } catch (e) {
      console.log("error updating data", e);
    }
  };

  updateVals();

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
