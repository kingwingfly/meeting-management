import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let pwd = (await req.json()).pwd;
    if (pwd !== '12138') {
        return NextResponse.json({ result: false })
    }
    await sql`DELETE FROM meetings;`
    await sql`DELETE FROM occupied;`
    await sql`DELETE FROM users_meetings;`;
    return NextResponse.json({ result: true })
}