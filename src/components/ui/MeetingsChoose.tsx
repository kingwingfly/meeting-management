import { add, parse, format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, MouseEvent, SetStateAction, useState } from "react";

export default function MeetingsChoose({ chooses, postedData }: {
    chooses: { [key: string]: number },
    postedData: { duration: number, participants: number[], meetingType: string }
}) {
    let date = new Date(2023, 7, 21, 0, 0, 0);
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const [isSencondClick, setIsSecondClick] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const handleDateTimeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedDateTime(event.target.value);
        setIsSecondClick(false);
    };
    const handleDateClick = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        let temp = event.currentTarget.textContent as string;
        const inputDate = parse(temp, 'yyyy/M/d HH:mm:ss', new Date());
        const formattedDate = format(inputDate, 'yyyy-MM-dd HH:mm');
        setSelectedDateTime(formattedDate)
        setIsSecondClick(false);
    };
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSecondClick(old => !old);
        if (isSencondClick) {
            let resp = await fetch("/api/create-meeting", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: selectedDateTime,
                    duration: postedData.duration,
                    participants: postedData.participants,
                })
            })
            setIsCreated((await resp.json()).result);
        }
    }
    if (isCreated) {
        return (
            <div className="flex items-center justify-center h-screen rounded-lg">
                <Link href="/dashboard/my" className="max-w-md mx-auto bg-white p-6 rounded hover:shadow">创建成功！点击查看会议列表</Link>
            </div>
        )
    }
    return (
        <div className="flex flex-col h-screen">
            <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">选择时间</h1>
                <form onSubmit={(e) => handleSubmit(e)} className="">
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-gray-700">选择时间：</span>
                            <input
                                type="datetime-local"
                                className="border rounded px-2 py-1 w-full text-base"
                                value={selectedDateTime}
                                onChange={handleDateTimeChange}
                            />
                        </label>
                    </div>
                    <div className="mt-1 flex justify-center">
                        <button type="submit" className={`"mt-4 ${isSencondClick ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"} text-white font-semibold py-2 px-4 rounded mx-auto dark:text-white"`}>
                            {isSencondClick ? '确认' : '提交'}
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex-grow border-t-2 border-gray-300 py-2"></div>
                <div className="title font-bold text-black text-2xl dark:text-white py-2">All invited available</div>
                <div className="flex-grow border-t-2 border-gray-300 py-2"></div>
            </div>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-scroll flex-grow">
                {Object.values(chooses).map((duration) => (
                    <div key={duration} className="choose">
                        <div className="p-2 bg-white rounded hover:shadow hover:bg-gray-50 text-center cursor-pointer" onClick={(e) => handleDateClick(e)}>
                            <div className="text-lg font-semibold m-1">
                                {add(date, { hours: duration }).toLocaleString()}
                            </div>
                        </div>
                        <div className="p-2 bg-white rounded shadow hover:bg-gray-50 text-center cursor-pointer" onClick={(e) => handleDateClick(e)}>
                            <div className="text-lg font-semibold m-1">
                                {add(date, { hours: duration, minutes: 30 }).toLocaleString()}
                            </div>
                        </div>
                    </ div>
                ))}
            </div>
        </div>
    )
}