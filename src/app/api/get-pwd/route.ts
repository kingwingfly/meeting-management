import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
    const some = "admin";
    const password = await sql`SELECT Password FROM Users WHERE Name=${some} LIMIT 1;`;
    console.log(password);
    return NextResponse.json('')
}

