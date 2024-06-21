import { ImageResponse } from "next/og";
import { kv } from "@vercel/kv";
import { NextApiResponse } from "next";
import { unstable_noStore as noStore } from "next/cache";

// DARICK: This is the first frame image with the options
export async function GET(request: Request, response: NextApiResponse) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || "";

    noStore();
    const user = await kv.hgetall(id);

    const displayFileItems = (user?.displayOrder as Array<string>) || [];

    // Read the file contents
    const name = user?.name;
    const truth1 = user?.truth1;
    const truth2 = user?.truth2;
    const lie = user?.lie;

    const firstItem =
      displayFileItems[0] === "truth1"
        ? truth1
        : displayFileItems[0] === "truth2"
        ? truth2
        : lie;

    const secondItem =
      displayFileItems[1] === "truth1"
        ? truth1
        : displayFileItems[1] === "truth2"
        ? truth2
        : lie;

    const thirdItem =
      displayFileItems[2] === "truth1"
        ? truth1
        : displayFileItems[2] === "truth2"
        ? truth2
        : lie;

    const shuffledList = [firstItem, secondItem, thirdItem];

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full py-12 px-4 md:items-left justify-between p-8 bg-[#101625] min-h-screen divide-y font-playfair">
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
          <h2 tw="flex flex-col text-4xl font-bold tracking-tight text-white text-left font-playfair">
            Which of these is a lie?
          </h2>
          {shuffledList.map((item, index) => (
            <h2
              tw="text-3xl font-semibold text-white border-b-2 border-white font-playfair"
              key={index}
            >
              {index + 1}: {item as string}
            </h2>
          ))}
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
