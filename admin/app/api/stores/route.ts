import { StoreService } from '@/services/store';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const storeBase = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  description: z.string(),
});

export async function POST(req: NextRequest) {
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

    const { data } = await store.create(storeData);

    return new NextResponse(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error('CREATE_STORE ERROR: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET() {
  const supabase = await createClient();
  const store = new StoreService(supabase);

  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { data } = await store.getByUserId(user.user.id);

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('SELECT_STORE ERROR: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
