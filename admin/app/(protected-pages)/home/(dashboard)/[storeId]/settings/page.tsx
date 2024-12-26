import { Separator } from '@/components/ui/separator';
import {
  TypographyH3,
  TypographyLarge,
  TypographyMuted,
} from '@/components/ui/typography';
import React from 'react';
import { StoreForm } from '@/app/(protected-pages)/home/components/store-form';
import { prisma } from '@/prisma';

export default async function SettingsStorePage({
  params,
}: {
  params: { storeId: string };
}) {
  const { storeId } = await params;

  const store = await prisma.store.findUniqueOrThrow({
    where: { id: storeId },
  });

  return (
    <div className="p-8 pt-0 space-y-8">
      <div>
        <TypographyH3>Store Settings</TypographyH3>
        <TypographyMuted>
          Manage your store settings and set preferences.
        </TypographyMuted>
        <Separator className="mt-6" />
      </div>
      <div>
        <TypographyLarge>General</TypographyLarge>
        <TypographyMuted>Update your store information.</TypographyMuted>
        <Separator className="mt-6" />
        <div className="mt-6">
          <StoreForm data={store} />
        </div>
      </div>
    </div>
  );
}
