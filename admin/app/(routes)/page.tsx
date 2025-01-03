import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/server';
import { BarChart2, ShoppingBag, ShoppingCart, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default async function RootPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <Link href={'/'}>
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="size-4" />
              ADMIN<i className="font-bold text-xl">&</i>COMMERCE
            </div>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#features"
            >
              Features
            </Link>
            {user && (
              <Button asChild variant="outline" size={'sm'}>
                <Link className="text-sm font-medium" href="/home">
                  Dashboard
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Manage Your Online Store with Ease
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Powerful analytics, inventory management, and order processing
                  all in one place.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/sign-in">Login</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <BarChart2 className="h-8 w-8 mb-2" />
                  <CardTitle>Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Get insights into your sales, customer behavior, and
                    inventory trends.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <ShoppingCart className="h-8 w-8 mb-2" />
                  <CardTitle>Order Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Process orders efficiently and keep track of shipments in
                    real-time.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 mb-2" />
                  <CardTitle>Customer Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Understand your customers better with detailed profiles and
                    purchase history.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
