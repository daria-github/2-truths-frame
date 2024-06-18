import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { v4 } from "uuid";
import fs from "fs";

export const getDisplayOrder = () => {
  const arrayOptions = ["truth1", "truth2", "lie"];
  for (let i = arrayOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayOptions[i], arrayOptions[j]] = [arrayOptions[j], arrayOptions[i]];
  }
  return arrayOptions;
};

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const uuid = v4();

  const dataDirectory = path.join(process.cwd(), `data/${uuid}`);

  // Ensure the directory exists
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  // Make folder
  const namePath = path.join(dataDirectory, "name.txt");
  const truth1Path = path.join(dataDirectory, "truth1.txt");
  const truth2Path = path.join(dataDirectory, "truth2.txt");
  const liePath = path.join(dataDirectory, "lie.txt");
  const displayOrderPath = path.join(dataDirectory, "displayOrder.txt");

  fs.appendFileSync(namePath, body.name);
  fs.appendFileSync(truth1Path, body.truth1);
  fs.appendFileSync(truth2Path, body.truth2);
  fs.appendFileSync(liePath, body.lie);

  const displayOrder = JSON.stringify(getDisplayOrder());
  fs.appendFileSync(displayOrderPath, displayOrder);

  return NextResponse.json({ id: uuid });
}
export async function POST(req: NextRequest): Promise<NextResponse> {
  return getResponse(req);
}
