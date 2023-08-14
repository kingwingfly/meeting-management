import Link from "next/link";

export default function SidebarButton({ href, holder }: {
    href: string,
    holder: string,
}) {
    return (
        <Link
            href={href}
            className="block py-2 px-3 rounded transition duration-300 font-medium hover:bg-orange-200 dark:hover:bg-slate-600"
        >
            {holder}
        </Link>
    )
}