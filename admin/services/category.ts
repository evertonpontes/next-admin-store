import { CategoryRepository } from '@/repositories/category';

export class CategoryService extends CategoryRepository {
  async getByStoreId(storeId: string) {
    const { data: categories, error } = await this.supabase
      .from('categories')
      .select('id, name, slug, updated_at, parent_id, created_at, store_id')
      .eq('store_id', storeId);

    if (error) throw error;

    const response = categories.map(async (category) => ({
      ...category,
      attributes: (await this.attributeService.getByCategoryId(category.id))
        .data,
    }));

    const data = await Promise.all(response);

    return { data };
  }
}
