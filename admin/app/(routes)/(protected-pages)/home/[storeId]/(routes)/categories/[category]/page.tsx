import { PageHeader } from '@/components/ui/page-header';
import { Separator } from '@/components/ui/separator';
import { CategoryForm } from './components/client';
import { createClient } from '@/utils/supabase/server';
import { CategoryService } from '@/services/category';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { storeId: string };
  searchParams: { categoryId: string };
}) {
  const supabase = await createClient();
  const categoryService = new CategoryService(supabase);

  let category;

  const { categoryId } = await searchParams;

  if (categoryId) {
    category = await categoryService.getById(categoryId);
  }

  const { storeId } = await params;
  const categories = await categoryService.getByStoreId(storeId);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="p-8 space-y-8">
        <PageHeader
          title="Category"
          description="Manage your category and set preferences"
        />
        <Separator />
        <CategoryForm data={category?.data} categories={categories.data} />
      </div>
    </div>
  );
}
