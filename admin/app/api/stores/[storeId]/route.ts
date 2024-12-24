import { prisma } from '@/prisma';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { storeBaseSchema } from '../route';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // asynchronous access of `params.id`.
    const { storeId } = await params;
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
      include: {
        categories: true,
      },
    });

    return new NextResponse(JSON.stringify(store), { status: 200 });
  } catch (error) {
    console.log('Error_Store_GET: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // asynchronous access of `params.id`.
    const { storeId } = await params;
    const body = await req.json();
    const { name, slug, description } = storeBaseSchema.parse(body);
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const store = await prisma.store.update({
      where: {
        id: storeId,
      },
      data: {
        name,
        slug,
        description,
      },
    });

    return new NextResponse(JSON.stringify(store), { status: 200 });
  } catch (error) {
    console.log('Error_Store_PUT: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // asynchronous access of `params.id`.
    const { storeId } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await prisma.store.delete({
      where: {
        id: storeId,
      },
    });

    return new NextResponse('Store deleted successfully', { status: 200 });
  } catch (error) {
    console.log('Error_Store_DELETE: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
