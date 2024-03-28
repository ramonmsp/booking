import { deleteById, editById, getById } from '@/app/lib/mocks/booking';
import { GetServerSidePropsContext } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: GetServerSidePropsContext) {
  const { params } = context;
  const booking = getById(params?.id as string);
  if (!booking) {
    return new NextResponse(null, {
      status: 404,
      statusText: 'Booking not found',
    });
  }
  return NextResponse.json(getById(params?.id as string));
}

export async function PATCH(req: Request, context: GetServerSidePropsContext) {
  const { params } = context;
  const body = await req.json();
  const id = params?.id?.toString();
  try {
    if (id) {
      editById(id, body);
      return NextResponse.json({
        status: 200,
        statusText: 'booking has been updated',
      });
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(req: Request, context: GetServerSidePropsContext) {
  const { params } = context;

  try {
    deleteById(params?.id as string);
    
    return NextResponse.json({
      status: 200,
      statusText: 'booking has been deleted',
    });
  } catch (error) {
    return NextResponse.error();
  }
}
