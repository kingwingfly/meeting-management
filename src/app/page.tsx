import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Link href="/dashboard" className="text-4xl font-semibold">DashBoard</Link>
    </ div>
  )
}
