import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let meeting = await req.json();
    return NextResponse.json({ "result": "good" })
}