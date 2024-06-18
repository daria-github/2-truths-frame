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
        <div tw="flex flex-col w-full py-12 px-4 md:items-left justify-between p-8 bg-black min-h-screen">
          <h1 tw="mt-4 mb-6 text-center text-4xl font-bold leading-9 text-white">{`${name} has told Two Truths and a Lie!`}</h1>
          <h2 tw="flex flex-col text-3xl sm:text-3xl font-bold tracking-tight text-white text-left">
            Which of these is a lie?
          </h2>
          {list.map((item, index) => (
            <h2 tw="text-2xl font-semibold text-white" key={index}>
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
