'use client';

import { cn } from '@/lib/utils';
import { ClipboardCopy, Lock, LockOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ApiDocsProps {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  description?: string;
  authorization?: 'auth' | 'none';
}

export const ApiDocs: React.FC<ApiDocsProps> = ({
  method = 'GET',
  path,
  description,
  authorization = 'none',
}) => {
  const methodBGColor = {
    GET: 'bg-blue-500',
    POST: 'bg-green-500',
    PATCH: 'bg-yellow-500',
    DELETE: 'bg-red-500',
  };

  return (
    <div>
      <div className="w-full min-h-14 border rounded-md p-2 flex flex-wrap items-center gap-4">
        <div
          className={cn(
            'px-4 py-2 font-bold rounded-md text-primary-foreground',
            methodBGColor[method]
          )}
        >
          {method}
        </div>
        <p className="font-bold font-mono">{path}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <div className="lg:ml-auto text-muted-foreground flex items-center gap-0.5">
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={() => {
              navigator.clipboard.writeText(path);
            }}
          >
            <ClipboardCopy className="size-4" />
          </Button>
          {authorization === 'auth' ? (
            <Lock className="size-4 text-destructive" />
          ) : (
            <LockOpen className="size-4" />
          )}
        </div>
      </div>
    </div>
  );
};
