import { ImageResponse } from "next/og";
import path from "path";
import fs from "fs";

// DARICK: This is the third frame image with the results
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || "";

    const nameFilePath = path.join(process.cwd(), "data", id, "name.txt");
    const lieFilePath = path.join(process.cwd(), "data", id, "lie.txt");

    const name = fs.readFileSync(nameFilePath, "utf8");
    const lie = fs.readFileSync(lieFilePath, "utf8");

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full py-12 px-4 md:items-left justify-between p-8 bg-black min-h-screen">
          <h1 tw="mt-4 mb-6 text-center text-4xl font-bold leading-9 text-white">{`${name}'s lie was!`}</h1>
          <h2 tw="flex flex-col text-3xl sm:text-3xl font-bold tracking-tight text-white text-left">
            {lie}
          </h2>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
