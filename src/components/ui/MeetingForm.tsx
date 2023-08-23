'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import MeetingsChoose from "./MeetingsChoose";
import { QueryResultRow } from "@vercel/postgres";


export default function MeetingForm({ rows }: { rows: QueryResultRow[] }) {
    const [ret, setRet] = useState({ loaded: false, chooses: {}, postedData: {} });
    const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedValue = parseInt(event.target.value);
        if (event.target.checked) {
            setSelectedParticipants((prevSelected) => [...prevSelected, selectedValue]);
        } else {
            setSelectedParticipants((prevSelected) => prevSelected.filter((value) => value !== selectedValue));
        }
    };
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitting(true);
        let duration = (event.currentTarget['duration'] as HTMLInputElement).value;
        let participants = selectedParticipants;
        let meetingType = (event.currentTarget['meetingType'] as HTMLSelectElement).value;
        let postData = {
            duration, participants, meetingType
        };
        const resp = await fetch("/api/try-create-meeting", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        if (resp.ok) {
            console.log('Data sent successfully.');
            setRet({ postedData: postData, loaded: true, ...(await resp.json()) });
            // You can handle successful response here
        } else {
            console.error('Failed to send data.');
            // You can handle error cases here
        }
    }
    if (ret.loaded) {
        return (
            <MeetingsChoose chooses={ret.chooses} postedData={ret.postedData as { duration: number, participants: number[], meetingType: string }} />
        )
    }
    return (
        <>
            <div className="max-w-md mx-auto bg-white p-6 shadow-md mt-10 rounded-lg dark:text-black">
                <h1 className="text-2xl font-semibold mb-4">提交会议信息</h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="mb-4">
                        <label htmlFor="duration" className="block font-medium mb-1">持续时间(h)</label>
                        <input type="text" id="duration" name="duration" className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300" placeholder="整数" required />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">参与者</label>
                        <div className="space-y-2">
                            {rows.map((row) => (
                                <label key={row.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="participants"
                                        value={row.id}
                                        onChange={(e) => handleCheckboxChange(e)}
                                        checked={selectedParticipants.includes(row.id)}
                                        className="mr-2 border rounded focus:ring focus:ring-blue-300"
                                    />
                                    {row.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="meetingType" className="block font-medium mb-1">会议方式</label>
                        <select id="meetingType" name="meetingType" className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300" required >
                            <option value="" disabled>选择会议方式</option>
                            <option value="in-person">面对面</option>
                            <option value="virtual">虚拟会议</option>
                            <option value="hybrid">混合会议</option>
                        </select>
                    </div>
                    <div className=" border-t pt-4"></div>
                    <div className="flex justify-center">
                        <button disabled={submitting} type="submit" className="px-4 py-2 items-center rounded-lg border shadow-sm text-black bg-gray-100 hover:bg-gray-50">{submitting ? "正在提交..." : "提交"}</button>
                    </div>
                </form>
            </div>
        </>
    )
}