import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";

export default function MeetingCard({ meeting, user_id, onRemoveing }: { meeting: Meeting, user_id: number, onRemoveing: CallableFunction }) {
    const [isSecond, setIsSecond] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [dateTime, setDateTime] = useState("");
    useEffect(() => {
        const utcDate = new Date(meeting.date_time); // UTC from db

        const targetTimeZone = "Asia/Shanghai";
        const formattedDate = utcDate.toLocaleString("zh-CH", { timeZone: targetTimeZone });

        console.log("UTC Date:", utcDate.toISOString());
        console.log(`Date in ${targetTimeZone} Time Zone:`, formattedDate);
        setDateTime(formattedDate);
    }, [meeting.date_time])
    async function handleDelete(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setIsSecond(true);
        if (isSecond) {
            setIsSecond(false);
            setIsDeleting(true);
            let resp = await fetch("/api/delete-meeting", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    meeting_id: meeting.meeting_id,
                    user_id: user_id,
                    duration: meeting.duration,
                    date_time: meeting.date_time,
                })
            })
            let result = (await resp.json()).result as boolean;
            setIsDeleting(false);
            if (result) {
                onRemoveing(meeting.meeting_id)
            }
        }
    }
    return (
        <div className="border p-4 rounded shadow flex justify-between items-center">
            <div className="border p-4 rounded shadow">
                <p className="font-semibold mb-2 text-xl">
                    Description: {meeting.describle}
                </p>
                <p className="mb-2">Date and Time: {dateTime}</p>
                <p className="mb-2">Location: {meeting.location}</p>
                <p className="mb-2">Duration: {meeting.duration} hours</p>
            </div>
            <div>
                <Link href={`/dashboard/details/${meeting.meeting_id}`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                    Details
                </Link>
                <button disabled={isDeleting} onClick={(e) => handleDelete(e)} className={`${isDeleting ? "bg-gray-500" : "bg-red-500"} text-white px-3 py-1 rounded w-44`}>
                    {isDeleting ? "Deleting..." : (isSecond ? "Click Again" : "Remove From Mine")}
                </button>
            </div>
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