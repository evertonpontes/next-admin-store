import { SupabaseClient } from '@supabase/supabase-js';
import { AttributeService } from '@/services/attributes';

export class CategoryRepository {
  protected supabase: SupabaseClient;
  protected attributeService: AttributeService;

  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient;
    this.attributeService = new AttributeService(supabaseClient);
  }

  async create(newData: {
    store_id: string;
    name: string;
    slug: string;
    parentId?: string;
    attributes: string[];
  }) {
    const { data: category, error } = await this.supabase
      .from('categories')
      .insert({
        name: newData.name,
        slug: newData.slug,
        parent_id: newData?.parentId,
        store_id: newData.store_id,
        updated_at: new Date(),
      })
      .select('id, name, slug, updated_at, parent_id, created_at, store_id')
      .single();

    if (error) throw error;

    const { data: attributes } = await this.attributeService.createMany(
      newData.attributes,
      category.id
    );

    return {
      data: {
        ...category,
        attributes,
      },
    };
  }

  async getAll() {
    const { data: categories, error } = await this.supabase
      .from('categories')
      .select('id, name, slug, updated_at, parent_id, created_at, store_id')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const response = categories.map(async (category) => ({
      ...category,
      attributes: (await this.attributeService.getByCategoryId(category.id))
        .data,
    }));

    const data = await Promise.all(response);

    return { data };
  }

  async getById(id: string) {
    const { data: category, error } = await this.supabase
      .from('categories')
      .select('id, name, slug, updated_at, parent_id, created_at, store_id')
      .eq('id', id)
      .single();

    if (error) throw error;

    const data = {
      ...category,
      attributes: (await this.attributeService.getByCategoryId(category.id))
        .data,
    };

    return { data };
  }

  async update(dataToUpdate: {
    id: string;
    name: string;
    parentId?: string;
    slug: string;
    attributes: string[];
  }) {
    await this.attributeService.deleteByCategoryId(dataToUpdate.id);

    const { data: category, error } = await this.supabase
      .from('categories')
      .update({
        name: dataToUpdate.name,
        slug: dataToUpdate.slug,
        parent_id: dataToUpdate?.parentId,
        updated_at: new Date(),
      })
      .eq('id', dataToUpdate.id)
      .select('id, name, slug, updated_at, parent_id, created_at, store_id')
      .single();

    if (error) throw error;

    const { data: attributes } = await this.attributeService.createMany(
      dataToUpdate.attributes,
      category.id
    );

    const data = { ...category, attributes };

    return { data };
  }

  async delete(id: string) {
    await this.attributeService.deleteByCategoryId(id);

    const { data, error } = await this.supabase
      .from('categories')
      .delete()
      .eq('id', id)
      .select('id, name, slug, updated_at, parent_id, created_at, store_id')
      .single();

    if (error) throw error;

    return { data };
  }
}
