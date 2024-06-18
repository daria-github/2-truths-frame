import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
// import { shuffleArray } from "../firstFrame/route";

// DARICK: This is the second frame image with the results
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const data = searchParams.get("data") || "";
    const parsedData = JSON.parse(decodeURI(data));

    const { truth1, truth2, lie, name } = parsedData;

    // Read votes stored in node filesystem
    // To-do: change this to go by randomized ID instead of name
    const dataDirectory = path.join(process.cwd(), "data");
    const filePath = path.join(dataDirectory, `votes-${name}.json`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const listOfVotes = Array.from(fileContents);

    const truth1Count = listOfVotes.filter((vote) => vote === "1").length;
    const truth2Count = listOfVotes.filter((vote) => vote === "2").length;
    const lieCount = listOfVotes.filter((vote) => vote === "3").length;

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full py-12 px-4 md:items-left justify-between p-8 bg-slate-800 min-h-screen">
          <h1 tw="mt-4 mb-6 text-center text-4xl font-bold leading-9 text-white">{`${name} has told Two Truths and a Lie!`}</h1>
          <h2 tw="flex flex-col text-3xl sm:text-3xl font-bold tracking-tight text-white text-left">
            Poll results
          </h2>
          <h3 tw="text-2xl font-semibold text-white">{`${truth1}: ${truth1Count}`} votes</h3>
          <h3 tw="text-2xl font-semibold text-white">{`${truth2}: ${truth2Count}`} votes</h3>
          <h3 tw="text-2xl font-semibold text-white">{`${lie}: ${lieCount}`} votes</h3>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
