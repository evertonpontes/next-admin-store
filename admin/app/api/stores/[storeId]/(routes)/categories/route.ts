import { CategoryService } from '@/services/category';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const categoryBase = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  parentId: z.string(),
  slug: z
    .string()
    .min(3, { message: 'Slug must be at least 3 characters.' })
    .regex(/^[a-z0-9]+(?:(?:-|_)+[a-z0-9]+)*$/gm, {
      message: 'Slug can only contain lowercase letters, numbers, and dashes.',
    }),
  attributes: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters.' })
    .array(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  const { storeId } = await params;
  const supabase = await createClient();
  const category = new CategoryService(supabase);

  try {
    const body = await req.json();
    const { data: categoryData, error: zodError } =
      categoryBase.safeParse(body);

    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (zodError) {
      return new NextResponse(zodError.message, { status: 400 });
    }

    const { data } = await category.create({
      store_id: storeId,
      ...categoryData,
    });

    return new NextResponse(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error('CREATE_CATEGORY ERROR: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  const { storeId } = await params;
  const supabase = await createClient();
  const category = new CategoryService(supabase);

  try {
    const { data } = await category.getByStoreId(storeId);

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('SELECT_CATEGORIES ERROR: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
