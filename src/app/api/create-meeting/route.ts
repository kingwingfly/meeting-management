import { NextRequest, NextResponse } from "next/server";
import { newGenSqlData, genSqls } from "meeting-arrangement-wasm";
import { QueryResult, db } from "@vercel/postgres";

export async function POST(req: NextRequest) {
    let data = await req.json();
    let client = await db.connect();
    const genData = newGenSqlData();
    console.log(genData);
    genData.date = data.date as string;
    genData.desc = data.desc as string;
    genData.duration = Number(data.duration);
    genData.participants = data.participants as number[];
    console.log(genData);
    let sql1 = genSqls(genData) as string;
    console.log(sql1);
    try {
        let ret = await client.query(sql1) as unknown as QueryResult<any>[];
        let meeting_id = ret[ret.length - 1].rows[0].meeting_id;
        await Promise.all(
            data.participants.map((id: number) => {
                let sql2 = `
INSERT INTO users_meetings (id, meetings)
VALUES (${id}, ARRAY[${meeting_id}])
ON CONFLICT (id)
DO UPDATE SET meetings = ARRAY(
    SELECT DISTINCT unnest(array_cat(users_meetings.meetings, ARRAY[${meeting_id}]))
);`;
                console.log(sql2);
                return client.query(sql2);
            })
        );
    } catch (error) {
        console.log(sql1);
        console.log(error);
        return NextResponse.json({ result: false })
    }
    return NextResponse.json({ result: true })
}