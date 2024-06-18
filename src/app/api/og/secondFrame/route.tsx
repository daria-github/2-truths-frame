import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

// DARICK: This is the second frame image with the results
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || "";

    const displayFilePath = path.join(
      process.cwd(),
      "data",
      id,
      "displayOrder.txt"
    );
    const displayFileItems = fs.readFileSync(displayFilePath, "utf8");
    const parsedItems = JSON.parse(displayFileItems);

    const truth1FilePath = path.join(process.cwd(), "data", id, "truth1.txt");
    const truth2FilePath = path.join(process.cwd(), "data", id, "truth2.txt");
    const nameFilePath = path.join(process.cwd(), "data", id, "name.txt");
    const lieFilePath = path.join(process.cwd(), "data", id, "lie.txt");
    const votesFilePath = path.join(process.cwd(), "data", id, "votes.txt");

    const truth1 = fs.readFileSync(truth1FilePath, "utf8");
    const truth2 = fs.readFileSync(truth2FilePath, "utf8");
    const name = fs.readFileSync(nameFilePath, "utf8");
    const lie = fs.readFileSync(lieFilePath, "utf8");
    const votes = fs.readFileSync(votesFilePath, "utf8").split("\n");

    const truth1Count = votes.filter((vote) => vote === "truth1").length;
    const truth2Count = votes.filter((vote) => vote === "truth2").length;
    const lieCount = votes.filter((vote) => vote === "lie").length;

    const firstItemVotes =
      parsedItems[0] === "truth1"
        ? `${truth1}: ${truth1Count}`
        : parsedItems[0] === "truth2"
        ? `${truth2}: ${truth2Count}`
        : `${lie}: ${lieCount}`;

    const secondItemVotes =
      parsedItems[1] === "truth1"
        ? `${truth1}: ${truth1Count}`
        : parsedItems[1] === "truth2"
        ? `${truth2}: ${truth2Count}`
        : `${lie}: ${lieCount}`;

    const thirdItemVotes =
      parsedItems[2] === "truth1"
        ? `${truth1}: ${truth1Count}`
        : parsedItems[2] === "truth2"
        ? `${truth2}: ${truth2Count}`
        : `${lie}: ${lieCount}`;

    const allResults = [firstItemVotes, secondItemVotes, thirdItemVotes];

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full py-12 px-4 md:items-left justify-between p-8 bg-black min-h-screen">
          <h1 tw="mt-4 mb-6 text-center text-4xl font-bold leading-9 text-white">
            {`${name} has told Two Truths and a Lie!`}
          </h1>
          <h2 tw="flex flex-col text-3xl sm:text-3xl font-bold tracking-tight text-white text-left">
            Poll results
          </h2>
          <h3 tw="text-2xl font-semibold text-white">{`${firstItemVotes} votes`}</h3>
          <h3 tw="text-2xl font-semibold text-white">{`${secondItemVotes} votes`}</h3>
          <h3 tw="text-2xl font-semibold text-white">{`${thirdItemVotes} votes`}</h3>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
