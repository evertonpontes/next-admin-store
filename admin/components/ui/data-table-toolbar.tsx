'use client';
import { Table } from '@tanstack/react-table';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTableViewOptions } from '@/components/ui/data-table-view-options';
import { X } from 'lucide-react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  placeholder?: string;
  filterColumn?: string;
}

export const DataTableToolbar = <TData,>({
  table,
  placeholder = 'Filter data...',
  filterColumn = 'name',
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder}
          value={
            (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
          }
          className="sm:w-[150px] lg:w-[300px] transition-[width] ease-linear"
        />
        {isFiltered && (
          <Button
            variant={'ghost'}
            onClick={() => table.resetColumnFilters()}
            size={'sm'}
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
};
