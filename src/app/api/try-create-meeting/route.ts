import { NextRequest, NextResponse } from "next/server";
import { arrange, newOcs } from "meeting-arrangement-wasm";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
    let meeting_info: MeetingInfo = await req.json();
    const runWasm = async () => {
        console.log(meeting_info);
        const ocs = newOcs();
        const participantIds = meeting_info.participants.join(',');
        ocs.ocs = (await sql`
            SELECT occupied
            FROM occupied
            WHERE user_id IN (${participantIds});
        `).rows;
        return arrange(ocs, Number(meeting_info.duration));
    };
    return NextResponse.json({ chooses: await runWasm() })
}

interface MeetingInfo {
    duration: string,
    participants: string[],
    meetingType: string
}