import { ImageResponse } from "next/og";

// DARICK: This is the first frame image with the options
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const data = searchParams.get("data") || "";
    const parsedData = JSON.parse(decodeURI(data));

    const { name, truth1, truth2, lie } = parsedData;

    const list = [truth1, truth2, lie];

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full py-12 px-4 md:items-left justify-between p-8 bg-[#101625] min-h-screen divide-y font-playfair">
          <div tw="flex flex-row flex-auto">
            <h1 
              style={{ fontWeight: "bold" }}
              tw="mt-4 mb-6 text-4xl text-white font-playfair grow">
                {`${name} has told Two Truths and a Lie!`}
            </h1>
            <img tw="h-40" src="https://github.com/daria-github/2-truths-frame/blob/46b2b6f01033528cdf55b3000444756b762d5139/public/eyeGraphic.png?raw=true"/>
          </div>
          <h2 tw="flex flex-col text-4xl font-bold tracking-tight text-white text-left font-playfair">
            Which of these is a lie?
          </h2>
          {list.map((item, index) => (
            <h2 tw="text-3xl font-semibold text-white border-b-2 border-white font-playfair" key={index}>
              {index + 1}: {item}
            </h2>
          ))}
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
