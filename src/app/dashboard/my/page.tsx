import Link from "next/link";
import { getServerSession } from "next-auth";
import { options as authOptions } from "../../api/auth/[...nextauth]/options"
import { db } from "@vercel/postgres";
import MetingsDisplay from "@/components/ui/MeetingsDisplay";

export default async function MyPage() {
    const session = await getServerSession(authOptions);
    const user_name = session?.user?.name;
    let client = await db.connect();
    let sql_ = `SELECT id FROM users WHERE name='${user_name}';`;
    let user_id = (await client.query(sql_)).rows[0].id;
    sql_ = `SELECT meetings FROM users_meetings WHERE id=${user_id};`;
    let meeting_ids = (await client.query(sql_)).rows[0].meetings as number[];
    let meeting_ids_str = meeting_ids.map((num) => num.toString()).join(',');
    sql_ = `SELECT meeting_id, date_time, location, describle, duration, participants FROM meetings WHERE meeting_id IN (${meeting_ids_str});`;
    let meetings = (await client.query(sql_)).rows;
    // console.log(meetings);
    const now = new Date();
    const upcomingMeetings = meetings.filter(
        meeting => new Date(meeting.date_time) > now
    );
    const pastMeetings = meetings.filter(
        meeting => new Date(meeting.date_time) <= now
    );

    return (
        <div className="flex flex-col bg-white dark:text-white">
            <MetingsDisplay meetings={upcomingMeetings} user_id={user_id} />
            <MetingsDisplay meetings={pastMeetings} user_id={user_id} />
        </div>
    )
}