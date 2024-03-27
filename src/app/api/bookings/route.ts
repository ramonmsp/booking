import { Booking, allBookings, create, getAll } from "@/app/lib/mocks/booking";
import { allProperties } from "@/app/lib/mocks/properties";
import { NextResponse } from "next/server";

export async function GET() {   
    return NextResponse.json(getAll());
}

export async function POST(request: Request) {
    const body = await request.json() as Omit<Booking, 'id'>;
    const id = `${Array.from(allBookings.values()).length + 1}`;
    const booking = { ...body, id, property: allProperties.get(body.property.id)! } as Booking;

    create(id.toString(), booking);

    return NextResponse.json({ status: 200, message: 'booking has been created', payload: booking });
}

export async function DELETE() {
    allBookings.clear();

    return NextResponse.json({ status: 200, message: 'bookings were deleted' });
}
