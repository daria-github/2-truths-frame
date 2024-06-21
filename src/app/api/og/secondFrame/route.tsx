import { ImageResponse } from "next/og";
import { kv } from "@vercel/kv";
import { unstable_noStore as noStore } from "next/cache";

// DARICK: This is the second frame image with the results
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || "";
    noStore();
    const user = await kv.hgetall(id);

    console.log("IN API ROUTE", user);

    const displayFileItems = (user?.displayOrder as Array<string>) || [];

    const truth1 = user?.truth1;
    const truth2 = user?.truth2;
    const name = user?.name;
    const lie = user?.lie;

    const truth1Count = user?.truth1Votes;
    const truth2Count = user?.truth2Votes;
    const lieCount = user?.lieVotes;

    const firstItemVotes =
      displayFileItems[0] === "truth1"
        ? `${truth1}: ${truth1Count}`
        : displayFileItems[0] === "truth2"
        ? `${truth2}: ${truth2Count}`
        : `${lie}: ${lieCount}`;

    const secondItemVotes =
      displayFileItems[1] === "truth1"
        ? `${truth1}: ${truth1Count}`
        : displayFileItems[1] === "truth2"
        ? `${truth2}: ${truth2Count}`
        : `${lie}: ${lieCount}`;

    const thirdItemVotes =
      displayFileItems[2] === "truth1"
        ? `${truth1}: ${truth1Count}`
        : displayFileItems[2] === "truth2"
        ? `${truth2}: ${truth2Count}`
        : `${lie}: ${lieCount}`;

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full py-12 px-4 md:items-left justify-between p-8 bg-black min-h-screen divide-y font-playfair">
          <div tw="flex flex-row flex-auto">
            <h1
              style={{ fontWeight: "bold" }}
              tw="mt-4 mb-6 text-4xl text-white font-playfair grow"
            >
              {`${name} has told Two Truths and a Lie!`}
            </h1>
            <img
              tw="h-40"
              src="https://github.com/daria-github/2-truths-frame/blob/46b2b6f01033528cdf55b3000444756b762d5139/public/eyeGraphic.png?raw=true"
            />
          </div>
          <h2 tw="flex flex-col text-4xl sm:text-3xl font-bold tracking-tight text-white text-left">
            Poll results
          </h2>
          <h3 tw="text-3xl font-semibold text-white border-b-2 border-white font-playfair">{`${firstItemVotes} votes`}</h3>
          <h3 tw="text-3xl font-semibold text-white border-b-2 border-white font-playfair">
            {`${secondItemVotes} votes`}
          </h3>
          <h3 tw="text-3xl font-semibold text-white border-b-2 border-white font-playfair">
            {`${thirdItemVotes} votes`}
          </h3>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
