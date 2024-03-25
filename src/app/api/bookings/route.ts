import { Booking, allBookings, getAll } from "@/app/lib/mocks/booking";
import { allPlaces } from "@/app/lib/mocks/places";
import { NextResponse } from "next/server";

export async function GET() {   
    return NextResponse.json(getAll());
}

export async function POST(request: Request) {
    const body = await request.json() as Omit<Booking, 'id'>;
    const id = `${Array.from(allBookings.values()).length + 1}`;
    const booking = { ...body, id, place: allPlaces.get(body.place.id)! } as Booking;

    allBookings.set(id.toString(), booking);

    return NextResponse.json({ status: 200, message: 'booking has been created', payload: booking });
}
