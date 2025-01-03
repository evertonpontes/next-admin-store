import { AttributeRepository } from '@/repositories/attributes';

export class AttributeService extends AttributeRepository {
  async getByCategoryId(categoryId: string) {
    const { data, error } = await this.supabase
      .from('attributes')
      .select('id, name, category_id')
      .eq('category_id', categoryId);

    if (error) throw error;

    return { data };
  }

  async deleteByCategoryId(categoryId: string) {
    const { data, error } = await this.supabase
      .from('attributes')
      .delete()
      .eq('category_id', categoryId);

    if (error) throw error;

    return { data };
  }
}
