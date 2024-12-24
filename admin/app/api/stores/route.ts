import { prisma } from '@/prisma';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import z from 'zod';

export const storeBaseSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.'),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters.')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be a valid slug.'),
  description: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, slug, description } = storeBaseSchema.parse(body);
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const store = await prisma.store.create({
      data: {
        name,
        slug,
        description,
        ownerId: user.id,
      },
    });

    return new NextResponse(JSON.stringify(store), { status: 201 });
  } catch (error) {
    console.log('Error_Store_POST: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const stores = await prisma.store.findMany({
      where: {
        ownerId: user.id,
      },
      include: {
        _count: true,
      },
    });

    return new NextResponse(JSON.stringify(stores), { status: 200 });
  } catch (error) {
    console.log('Error_Store_GET: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
