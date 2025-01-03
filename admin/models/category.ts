import { Attributes } from './attributes';

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string;
  store_id: string;
  created_at: Date;
  updated_at: Date;
  attributes: Attributes[];
}
