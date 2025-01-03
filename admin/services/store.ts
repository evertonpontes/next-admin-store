import { StoreRepository } from '@/repositories/store';

export class StoreService extends StoreRepository {
  async getByUserId(userId: string) {
    const { data, error } = await this.supabase
      .from('stores')
      .select('id, name, description, updated_at, created_at, user_id')
      .eq('user_id', userId);

    if (error) throw error;

    return { data };
  }
}
