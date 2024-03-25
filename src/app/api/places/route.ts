import { getAll } from "@/app/lib/mocks/places";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(getAll());
}
