
export default function Page({ params }: { params: { meeting_id: number } }) {
    return <div>My Post: {params.meeting_id}</div>
}