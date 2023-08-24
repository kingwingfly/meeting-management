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
    try {
        sql_ = `SELECT meeting_id, date_time, location, describle, duration, participants FROM meetings WHERE meeting_id IN (SELECT unnest(meetings) FROM users_meetings WHERE id = ${user_id});`;
        console.log(sql_);
        let meetings = (await client.query(sql_)).rows;
        console.log(meetings);
        const now = new Date();
        const upcomingMeetings = meetings.filter(
            meeting => new Date(meeting.date_time) > now
        );
        const pastMeetings = meetings.filter(
            meeting => new Date(meeting.date_time) <= now
        );

        return (
            <div className="flex flex-col">
                <MetingsDisplay meetings={upcomingMeetings} user_id={user_id} title="待办会议" />
                <MetingsDisplay meetings={pastMeetings} user_id={user_id} title="历史会议" />
            </div>
        )
    } catch (error) {
        return (
            <div className="flex flex-col">
                <MetingsDisplay meetings={[]} user_id={user_id} title="待办会议" />
                <MetingsDisplay meetings={[]} user_id={user_id} title="历史会议" />
            </div>
        )
    }
}

export const revalidate = 0;