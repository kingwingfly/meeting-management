'use client'

import { QueryResultRow } from "@vercel/postgres"
import { FormEvent, useState } from "react"

export default function MeetingForm({ rows }: { rows: QueryResultRow[] }) {
    const [ret, setRet] = useState({ result: false });
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let duration = (event.currentTarget['duration'] as HTMLInputElement).value;
        let participants = Array.from(event.currentTarget['participants'].selectedOptions).map((option) => (option as HTMLOptionElement).value);
        let meetingType = (event.currentTarget['meetingType'] as HTMLSelectElement).value;
        let postData = {
            duration, participants, meetingType
        };
        const resp = await fetch("/api/create-meeting", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        if (resp.ok) {
            console.log('Data sent successfully.');
            setRet({ ...ret, ...(await resp.json()) });
            // You can handle successful response here
        } else {
            console.error('Failed to send data.');
            // You can handle error cases here
        }
    }
    if (ret.result) {
        return <h1>{ret.result}</h1>
    }
    return (
        <>
            <div className="max-w-md mx-auto bg-white p-6 shadow-md mt-10 rounded-lg dark:text-black">
                <h1 className="text-2xl font-semibold mb-4">提交会议信息</h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="mb-4">
                        <label htmlFor="duration" className="block font-medium mb-1">持续时间</label>
                        <input type="text" id="duration" name="duration" className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300" placeholder="例如：1小时30分钟" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="participants" className="block font-medium mb-1" >参与者</label>
                        <select id="participants" name="participants" className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300" multiple required >
                            {rows.map((row) => {
                                return (
                                    <option key={row.name} value={row.name}>{row.name}</option>
                                )
                            })}
                        </select>
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
                        <button type="submit" className="px-4 py-2 items-center rounded-lg border shadow-sm text-black bg-gray-100 hover:bg-gray-50">提交</button>
                    </div>
                </form>
            </div>
        </>
    )
}

