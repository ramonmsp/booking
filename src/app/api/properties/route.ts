import { getAll } from "@/app/lib/mocks/properties";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(getAll());
}
