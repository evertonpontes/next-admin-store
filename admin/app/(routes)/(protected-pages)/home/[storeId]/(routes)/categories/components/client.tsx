'use client';

import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Category } from '@/models/category';

export const CategoriesTable = ({ categories }: { categories: Category[] }) => {
  return (
    <div>
      <DataTable columns={columns} data={categories} />
    </div>
  );
};
