import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import { getDisplayOrder } from "./displayOrder";
import { kv } from "@vercel/kv";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const uuid = v4();
  const displayOrder = JSON.stringify(getDisplayOrder());

  const user = await kv.hset(uuid, {
    name: body.name,
    truth1: body.truth1,
    truth2: body.truth2,
    lie: body.lie,
    displayOrder,
    truth1Votes: 0,
    truth2Votes: 0,
    lieVotes: 0,
  });

  return NextResponse.json({ id: uuid });
}
export async function POST(req: NextRequest): Promise<NextResponse> {
  return getResponse(req);
}
