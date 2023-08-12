export default function ReservePage() {
    return (
        <>
            <div className="max-w-md mx-auto bg-white p-6 shadow-md mt-10 rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">提交会议信息</h1>

                <form>
                    <div className="mb-4">
                        <label htmlFor="duration" className="block font-medium mb-1">持续时间</label>
                        <input type="text" id="duration" name="duration" className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300" placeholder="例如：1小时30分钟" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="participants" className="block font-medium mb-1">参与者</label>
                        <input type="text" id="participants" name="participants" className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300" placeholder="例如：John Doe, Jane Smith" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="meetingType" className="block font-medium mb-1">会议方式</label>
                        <select id="meetingType" name="meetingType" className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300" required >
                            <option value="" disabled selected>选择会议方式</option>
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