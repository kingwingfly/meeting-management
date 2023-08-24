'use client'

import MeetingCard from "./MeetingCard";
import { useState } from "react";

export default function MeetingsDisplay({ meetings, user_id, title }: { meetings: Meeting[], user_id: number, title: string }) {
    const [meetings_, setMeetings] = useState(meetings);
    function removeMeeting(id: number) {
        setMeetings(meetings => meetings.filter(m => m.meeting_id !== id));
    }
    return (
        <div className="mt-4 shadow-md p-4 rounded-lg dark:text-white dark:bg-gray-600">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {meetings_.map((meeting, index) => (
                <MeetingCard key={index} meeting={meeting} user_id={user_id} onRemoveing={removeMeeting}></MeetingCard>
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