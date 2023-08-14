import MeetingForm from "@/components/ui/MeetingForm";
import { sql } from "@vercel/postgres"

export default async function ReservePage() {
    const { rows } = await sql`SELECT * FROM Users;`;
    return (
        <>
            <MeetingForm rows={rows}></MeetingForm>
        </>
    )
}

