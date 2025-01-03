import { SupabaseClient } from '@supabase/supabase-js';

export class AttributeRepository {
  protected supabase: SupabaseClient;

  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient;
  }

  async create(attributes: string[], categoryId: string) {
    const { data, error } = await this.supabase
      .from('attributes')
      .insert(
        attributes.map((attribute) => ({
          category_id: categoryId,
          name: attribute,
        }))
      )
      .select('id, name, category_id')
      .single();

    if (error) throw error;

    return { data };
  }

  async createMany(attributes: string[], categoryId: string) {
    const { data, error } = await this.supabase
      .from('attributes')
      .upsert(
        attributes.map((attribute) => ({
          category_id: categoryId,
          name: attribute,
        }))
      )
      .select('id, name, category_id');

    if (error) throw error;

    return { data };
  }

  async getAll() {
    const { data, error } = await this.supabase
      .from('attributes')
      .select('id, name, category_id');

    if (error) throw error;

    return { data };
  }

  async getById(id: string) {
    const { data, error } = await this.supabase
      .from('attributes')
      .select('id, name, category_id')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data };
  }

  async update(id: string, name: string) {
    const { data, error } = await this.supabase
      .from('attributes')
      .update({
        name,
        updated_at: new Date(),
      })
      .eq('id', id)
      .select('id, name, category_id')
      .single();

    if (error) throw error;

    return { data };
  }

  async delete(id: string) {
    const { data, error } = await this.supabase
      .from('attributes')
      .delete()
      .eq('id', id)
      .select('id, name, category_id')
      .single();

    if (error) throw error;

    return { data };
  }
}
