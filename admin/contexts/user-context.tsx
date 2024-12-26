'use client';

import React from 'react';

type User = {
  id: string;
  email: string | undefined;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  website?: string;
};

interface UserContextValue {
  user: User;
}

export const UserContext = React.createContext<UserContextValue>({
  user: {} as User,
});

interface UserContextProviderProps {
  children?: React.ReactNode;
  user: User;
}

export const UserContextProvider = ({
  children,
  user,
}: UserContextProviderProps) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
