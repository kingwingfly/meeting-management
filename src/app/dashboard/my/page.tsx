import Link from "next/link";

export default function MyPage() {
    return (
        <>
            <div className="flex flex-col h-screen dark:text-black">
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">待办会议</h2>
                    <ul>
                        <li className="flex items-center space-x-2 mb-2">
                            <input type="checkbox" className="form-checkbox" />
                            <span>Meeting 1</span>
                        </li>
                        <li className="flex items-center space-x-2 mb-2">
                            <input type="checkbox" className="form-checkbox" />
                            <span>Meeting 2</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white mt-4 shadow-md p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">历史会议</h2>
                    <ul>
                        <li className="flex items-center mb-2 justify-between">
                            <span className="">Meeting A - Completed</span>
                            <Link className="" href="/detail">详情</Link>
                        </li>
                        <li className="flex items-center mb-2 justify-between">
                            <span>Meeting B - Completed</span>
                            <Link className="" href="/detail">详情</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}