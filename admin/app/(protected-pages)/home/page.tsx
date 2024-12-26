import React from 'react';
import { NavBar } from './components/nav-bar';
import { StoreClient } from './components/client';

export default async function HomePage() {
  return (
    <main>
      <NavBar />
      <StoreClient />
    </main>
  );
}
