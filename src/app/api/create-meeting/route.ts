import { NextRequest, NextResponse } from "next/server";
import { newGenSqlData, genSqls } from "meeting-arrangement-wasm";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
    let data = await req.json();
    const genData = newGenSqlData();
    genData.date = data.date as string;
    genData.duration = Number(data.duration);
    genData.participants = data.participants as string[];
    let sqls = genSqls(genData) as string[];
    console.log(sqls);
    await Promise.all(sqls.map((sql_) => sql`${sql_}`));
    return NextResponse.json({ result: false })
}