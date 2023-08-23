import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres";

export async function POST(req: NextRequest) {
    let data = await req.json();
    console.log(data);
    let user_id = data.user_id as number;
    let meeting_id = data.meeting_id as number;
    let client = await db.connect();
    try {
        let sql = `UPDATE users_meetings SET meetings=array_remove(meetings, ${meeting_id}) WHERE id=${user_id};`;
        console.log(sql);
        await client.query(sql);
        sql = `UPDATE meetings SET participants=array_remove(participants, ${user_id}) WHERE meeting_id=${meeting_id};`;
        console.log(sql);
        await client.query(sql);
        return NextResponse.json({ result: true })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ result: false })
    }
}