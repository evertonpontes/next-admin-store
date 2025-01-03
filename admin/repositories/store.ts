import { SupabaseClient } from '@supabase/supabase-js';

export class StoreRepository {
  protected supabase: SupabaseClient;

  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient;
  }

  async create(store: { name: string; description: string }) {
    const { data, error } = await this.supabase
      .from('stores')
      .insert({
        ...store,
        updated_at: new Date(),
      })
      .select('id, name, description, updated_at, created_at, user_id')
      .single();

    if (error) throw error;

    return { data };
  }

  async getAll() {
    const { data, error } = await this.supabase
      .from('stores')
      .select('id, name, description, updated_at, created_at, user_id')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data };
  }

  async getById(id: string) {
    const { data, error } = await this.supabase
      .from('stores')
      .select('id, name, description, updated_at, created_at, user_id')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data };
  }

  async update(store: { name: string; description: string }, id: string) {
    const { data, error } = await this.supabase
      .from('stores')
      .update({
        ...store,
        updated_at: new Date(),
      })
      .eq('id', id)
      .select('id, name, description, updated_at, created_at, user_id')
      .single();

    if (error) throw error;

    return { data };
  }

  async delete(id: string) {
    const { data, error } = await this.supabase
      .from('stores')
      .delete()
      .eq('id', id)
      .select('id, name, description, updated_at, created_at, user_id')
      .single();

    if (error) throw error;

    return { data };
  }
}
