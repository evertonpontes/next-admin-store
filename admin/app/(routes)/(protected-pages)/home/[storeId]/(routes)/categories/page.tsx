import { PageHeader } from '@/components/ui/page-header';
import { Separator } from '@/components/ui/separator';
import { CategoriesTable } from './components/client';
import { createClient } from '@/utils/supabase/server';
import { CategoryService } from '@/services/category';
import { CategoryModalContext } from '@/contexts/category-modal-context';

export default async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const { storeId } = await params;

  const supabase = await createClient();
  const categoryService = new CategoryService(supabase);
  const categories = await categoryService.getByStoreId(storeId);

  return (
    <div className="w-full min-h-svh p-6 space-y-6">
      <CategoryModalContext />
      <PageHeader
        title="Categories"
        description="Manage your categories and set preferences"
      />
      <Separator />
      <CategoriesTable categories={categories.data} />
    </div>
  );
}
