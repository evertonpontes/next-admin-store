import { StoreModalContext } from '@/contexts/store-modal-context';
import { UserContextProvider } from '@/contexts/user-context';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <UserContextProvider user={user}>
      {children}
      <StoreModalContext />
    </UserContextProvider>
  );
}
