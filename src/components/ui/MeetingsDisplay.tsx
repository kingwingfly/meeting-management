import MeetingCard from "./MeetingCard";

export default function MeetingsDisplay({ meetings, user_id, title }: { meetings: Meeting[], user_id: number, title: string }) {
    return (
        <div className="mt-4 shadow-md p-4 rounded-lg dark:text-white dark:bg-gray-600">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
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