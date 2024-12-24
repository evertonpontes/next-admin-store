import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Store } from '@prisma/client';
import { Actions } from './actions';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { StoreIcon } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<Store>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <Link
          href={`/home/${row.original.id}`}
          className="flex w-[100px] items-center hover:underline text-blue-500"
        >
          <StoreIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="truncate">{row.original.name}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      return (
        <p className="truncate max-w-[200px]">{row.original.description}</p>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => dayjs(row.original.createdAt).format('YYYY-MM-DD'),
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions store={row.original} />,
  },
];
