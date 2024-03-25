import { getById } from '@/app/lib/mocks/places';
import { GetServerSidePropsContext } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: GetServerSidePropsContext) {
  const { params } = context;
  const place = getById(params?.id as string);
  if (!place) {
    return new NextResponse(null, {
      status: 404,
      statusText: 'Place not found',
    });
  }
  return NextResponse.json(getById(params?.id as string));
}
