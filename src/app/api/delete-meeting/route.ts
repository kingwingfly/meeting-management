import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres";
import differenceInHours from "date-fns/differenceInHours";


export async function POST(req: NextRequest) {
    let data = await req.json();
    console.log(data);
    let user_id = data.user_id as number;
    let meeting_id = data.meeting_id as number;
    let duration = data.duration as number;
    let date_time_ = data.date_time as string;
    let date_time = new Date(date_time_);
    let start = new Date(2023, 7, 21);
    let duration_ = differenceInHours(date_time, start);
    console.log(duration_, duration);

    let client = await db.connect();
    try {
        // remove meeting_id from user's meetings
        let sql = `UPDATE users_meetings SET meetings=array_remove(meetings, ${meeting_id}) WHERE id=${user_id};`;
        console.log(sql);
        // remove user_id from meeting's participants
        await client.query(sql);
        sql = `UPDATE meetings SET participants=array_remove(participants, ${user_id}) WHERE meeting_id=${meeting_id};`;
        console.log(sql);
        await client.query(sql);
        // release occupied
        for (let toDel = duration_; toDel < duration + duration_; toDel++) {
            sql = `UPDATE occupied AS t SET occupied = (
    occupied[:position-1] || occupied[position+1:]
)
FROM (
    SELECT id, array_position(occupied, ${toDel}) AS position
    FROM occupied
    WHERE id = ${user_id}
) AS subquery
WHERE t.id = subquery.id;`;
            console.log(sql);
            await client.query(sql);
        }
        return NextResponse.json({ result: true })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ result: false })
    }
}