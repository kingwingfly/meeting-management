import SidebarButton from "../../components/ui/SidebarButton";

export default function Sidebar({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-600" >
            <div className="bg-orange-300 dark:bg-gray-800 text-black dark:text-white w-1/4 py-6 px-4">
                <div className="text-xl font-semibold mb-6">Sidebar</div>
                <nav className="space-y-2">
                    <SidebarButton href="/dashboard/my" holder="My" />
                    <SidebarButton href="/dashboard/reserve" holder="Reserve" />
                    <SidebarButton href="/dashboard/profile" holder="Profile" />
                </nav>
            </div>
            <div className="flex-col w-3/4 p-8">
                {children}
            </div>
        </div>
    )
}