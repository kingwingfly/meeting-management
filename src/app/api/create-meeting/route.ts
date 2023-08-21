import { NextRequest, NextResponse } from "next/server";
import { arrange, new_ocs } from "meeting-arrangement-wasm";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
    let meeting_info: MeetingInfo = await req.json();
    const runWasm = async () => {
        console.log(meeting_info);
        const ocs = new_ocs();
        meeting_info.participants.map(async (id) => {
            return (await sql`SELECT occupied FROM occupied WHERE user_id=${id};`)
        }).forEach(async (occupied) => {
            ocs.ocs.push((await occupied).rows as any);
            ocs.ocs.push([5578]);
        })
        return arrange(ocs, Number(meeting_info.duration));
    };
    return NextResponse.json({ chooses: await runWasm() })
}

interface MeetingInfo {
    duration: string,
    participants: string[],
    meetingType: string
}