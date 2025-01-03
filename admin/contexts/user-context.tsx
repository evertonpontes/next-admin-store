'use client';

import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { createContext, useCallback, useEffect, useState } from 'react';

export type UserData = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  username: string;
  website: string;
};

interface UserContextProps {
  user: UserData;
}

export const UserContext = createContext<UserContextProps>({
  user: {} as UserData,
});

interface UserProviderProps {
  children: React.ReactNode;
  user: User;
}

export const UserContextProvider: React.FC<UserProviderProps> = ({
  children,
  user,
}) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatar_url, setAvatarUrl] = useState('');

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name || '');
        setUsername(data.username || '');
        setWebsite(data.website || '');
        setAvatarUrl(data.avatar_url || '');
      }
    } catch (error) {
      console.log(error);
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  if (loading) {
    return null;
  }

  return (
    <UserContext.Provider
      value={{
        user: {
          id: user.id,
          email: user.email || '',
          full_name: fullname,
          avatar_url: avatar_url,
          username: username,
          website: website,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
