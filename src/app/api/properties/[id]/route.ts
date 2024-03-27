import { getById } from '@/app/lib/mocks/properties';
import { GetServerSidePropsContext } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: GetServerSidePropsContext) {
  const { params } = context;
  const property = getById(params?.id as string);
  if (!property) {
    return new NextResponse(null, {
      status: 404,
      statusText: 'Property not found',
    });
  }
  return NextResponse.json(getById(params?.id as string));
}
