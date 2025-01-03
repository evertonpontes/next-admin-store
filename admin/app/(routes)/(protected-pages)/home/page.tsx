import { PageHeader } from '@/components/ui/page-header';
import { Separator } from '@/components/ui/separator';
import { Header } from '@home/components/header';
import { StoreTable } from '@home/components/client';

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="w-full min-h-svh p-6 space-y-6">
        <PageHeader
          title="Stores"
          description="Manage your stores and set preferences"
        />
        <Separator />
        <StoreTable />
      </div>
    </div>
  );
}
