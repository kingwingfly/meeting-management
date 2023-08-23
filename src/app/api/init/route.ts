import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
    await sql`DELETE FROM meetings;`
    await sql`DELETE FROM occupied;`
    await sql`DELETE FROM users_meetings;`;
    return NextResponse.json({ result: true })
}