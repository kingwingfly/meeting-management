import { addDate } from "meeting-arrangement-wasm";

export default function MeetingsChoose({ chooses }: { chooses: { [key: string]: number } }) {
    return (
        <>
            {Object.values(chooses).map((duration) => <h1>{addDate(duration)}</h1>)}
        </>
    )
}