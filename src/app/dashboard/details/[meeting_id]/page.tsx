export default function Page({ params }: { params: { meeting_id: number } }) {
    let t = new Date("2023-08-25 01:00:00");
    console.log("without tz", t.toString());
    console.log("without tz", t.toLocaleString());
    t = new Date("2023-08-25 01:00:00+00");
    console.log("with tz", t.toString());
    console.log("with tz", t.toLocaleString());
    return <div>My Post: {params.meeting_id}</div>
}