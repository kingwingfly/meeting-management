import { NextRequest, NextResponse } from "next/server";
import { arrange, newOcs } from "meeting-arrangement-wasm";
import { db } from "@vercel/postgres";

export async function POST(req: NextRequest) {
    let meeting_info: MeetingInfo = await req.json();
    const runWasm = async () => {
        console.log(meeting_info);
        const ocs = newOcs();
        const participantIds = meeting_info.participants.join(',');
        let client = await db.connect();
        let sql_ = `
            SELECT occupied
            FROM occupied
            WHERE id IN (${participantIds});
        `;
        ocs.ocs = (await client.query(sql_)).rows.map((row) => row.occupied);
        return arrange(ocs, Number(meeting_info.duration));
    };
    return NextResponse.json({ chooses: await runWasm() })
}

interface MeetingInfo {
    duration: string,
    participants: string[],
    meetingType: string
}