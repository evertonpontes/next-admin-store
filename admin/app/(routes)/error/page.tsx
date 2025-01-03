import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: {
    error: string;
  };
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        <div className="space-y-4">
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Go back home</Link>
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-gray-100 rounded text-left">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">
              Error details:
            </h2>
            <p className="text-xs text-gray-600 break-all">
              {error || 'An unknown error occurred'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
