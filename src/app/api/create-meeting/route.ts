import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let { date, duration, participants } = await req.json();

    return NextResponse.json({ result: false })
}