import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { categoryBase } from '../route';
import { CategoryService } from '@/services/category';

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = await params;
  const supabase = await createClient();
  const category = new CategoryService(supabase);

  try {
    const { data } = await category.getById(categoryId);

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('SELECT_STORE ERROR: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = await params;
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

    const { data } = await category.update({
      id: categoryId,
      ...categoryData,
    });

    return new NextResponse(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error('CREATE_STORE ERROR: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = await params;
  const supabase = await createClient();
  const category = new CategoryService(supabase);

  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await category.delete(categoryId);

    return new NextResponse('Store deleted successfully', { status: 200 });
  } catch (error) {
    console.error('DELETE_STORE ERROR: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
