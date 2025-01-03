import { ApiDocs } from '@/components/api-docs';
import { StoreForm } from '@/components/store-form';
import { PageHeader } from '@/components/ui/page-header';
import { Separator } from '@/components/ui/separator';
import { SettingsHeader } from '@/components/ui/settings-header';
import { createClient } from '@/utils/supabase/server';
import React from 'react';

export default async function SettingsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const { storeId } = await params;

  const supabase = await createClient();

  const { data } = await supabase
    .from('stores')
    .select('*')
    .eq('id', storeId)
    .single();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="p-8 space-y-8">
        <PageHeader
          title="Store settings"
          description="Manage your store settings and set preferences."
        />
        <Separator />
      </div>
      <div className="p-8 pt-0 space-y-8">
        <SettingsHeader
          title="General"
          description="Update your store information."
        />
        <Separator />
        <StoreForm data={data} />
      </div>
      <div className="p-8 pt-0 space-y-8">
        <SettingsHeader
          title="API Docs"
          description="View and manage your store API documentation."
        />
        <Separator />
        <div className="space-y-2">
          <ApiDocs
            method="GET"
            path={`/api/stores/${storeId}`}
            description="Find store by ID"
          />
          <ApiDocs
            method="PATCH"
            path={`/api/stores/${storeId}`}
            description="Update existing store"
            authorization="auth"
          />
          <ApiDocs
            method="DELETE"
            path={`/api/stores/${storeId}`}
            description="Delete existing store"
            authorization="auth"
          />
        </div>
      </div>
    </div>
  );
}
