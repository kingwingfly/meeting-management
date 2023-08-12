import Link from "next/link";
import { getServerSession } from "next-auth";
import { options as authOptions } from "../../api/auth/[...nextauth]/options"

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    const name = session?.user?.name;
    const email = session?.user?.email;
    const image = session?.user?.image;
    return (
        <>
            <div className="flex flex-col items-center min-h-screen">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md min-w-full">
                    <div className="mb-4"></div>
                    <h1 className="text-gray-600 text-2xl font-semibold mb-2">{name ? name : "unknown"}</h1>
                    <p className="text-gray-500 mb-4">{email ? email : "unknown"}</p>
                    <div className="border-t border-gray-300 pt-4">
                        <p className="text-sm text-gray-700">Some introduce ...... </p>
                    </div>
                </div>
                <div className="text-white text-center py-4">
                    <Link className="px-4 py-2 rounded-lg border shadow-sm text-black bg-gray-100 hover:bg-gray-50" href="/api/auth/signout">Sign out</Link>
                </div>
            </div>
        </>
    )
}
