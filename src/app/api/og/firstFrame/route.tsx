import { ImageResponse } from "next/og";

export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// DARICK: This is the first frame image with the options
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const data = searchParams.get("data") || "";
    const parsedData = JSON.parse(decodeURI(data));

    const { name, truth1, truth2, lie } = parsedData;

    const list = [truth1, truth2, lie];
    // const shuffledList = shuffleArray(list);

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full py-12 px-4 md:items-left justify-between p-8 bg-slate-800">
          <h1 tw="mt-4 mb-6 text-center text-3xl font-bold leading-9 text-white">{`${name} has told Two Truths and a Lie!`}</h1>
          <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
            Which of these is a lie?
          </h2>
          {list.map((item, index) => (
            <h2 key={index}>{item}</h2>
          ))}
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
