import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let meeting = await req.json();
    // todo use wasm to impl meeting arrangement
    return NextResponse.json({ "result": "good" })
}
