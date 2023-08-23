'use client'

import MeetingCard from "./MeetingCard";

export default function MeetingsDisplay({ meetings, user_id }: { meetings: Meeting[], user_id: number }) {
    return (
        <div className="mt-4 shadow-md p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">待办会议</h2>
            {meetings.map((meeting, index) => (
                <MeetingCard key={index} meeting={meeting} user_id={user_id}></MeetingCard>
            ))}
        </div>
    )
}

interface Meeting {
    describle: string,
    date_time: string,
    location: string,
    duration: number,
    meeting_id: number,
    participants: number[]
}