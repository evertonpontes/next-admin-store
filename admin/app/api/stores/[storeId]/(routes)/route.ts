import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { storeBase } from '../../route';
import { StoreService } from '@/services/store';

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  const supabase = await createClient();
  const store = new StoreService(supabase);

  try {
    const { data } = await store.getById(params.storeId);

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('SELECT_STORE ERROR: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  const { storeId } = await params;

  const supabase = await createClient();

  const store = new StoreService(supabase);

  try {
    const body = await req.json();
    const { data: storeData, error: zodError } = storeBase.safeParse(body);

    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (zodError) {
      return new NextResponse(zodError.message, { status: 400 });
    }

    const { data } = await store.update(storeData, storeId);

    return new NextResponse(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error('UPDATE_STORE ERROR: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  const supabase = await createClient();
  const store = new StoreService(supabase);

  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await store.delete(params.storeId);

    return new NextResponse('Store deleted successfully', { status: 200 });
  } catch (error) {
    console.error('DELETE_STORE ERROR: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
