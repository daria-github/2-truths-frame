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
        <div tw="flex flex-col w-full py-12 px-4 md:items-left justify-between p-8 bg-black min-h-screen divide-y font-playfair">
          <div tw="flex flex-row flex-auto">
            <h1 
              style={{ fontWeight: "bold" }}
              tw="mt-4 mb-6 text-4xl text-white font-playfair grow">
                {`${name} has told Two Truths and a Lie!`}
            </h1>
            <img tw="h-40" src="https://github.com/daria-github/2-truths-frame/blob/46b2b6f01033528cdf55b3000444756b762d5139/public/eyeGraphic.png?raw=true"/>
          </div>
          <h2 tw="flex flex-col text-4xl sm:text-3xl font-bold tracking-tight text-white text-left">
            Poll results
          </h2>
          <h3 tw="text-3xl font-semibold text-white border-b-2 border-white font-playfair">{`${truth1}`} - {`${truth1Count}`} votes</h3>
          <h3 tw="text-3xl font-semibold text-white border-b-2 border-white font-playfair">{`${truth2}`} - {`${truth2Count}`} votes</h3>
          <h3 tw="text-3xl font-semibold text-white border-b-2 border-white font-playfair">{`${lie}`} - {`${lieCount}`} votes</h3>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
