'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import React from 'react';

export const NavBar = () => {
  const pathname = usePathname();
  const splitPathname = pathname.split('/').slice(1);
  const items = splitPathname.map((item) => ({
    title: item,
    url: pathname.split(item)[0] + item,
  }));
  const lastIndex = items.length - 1;

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex h-14 items-center px-4 gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {items.slice(0, lastIndex).map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="truncate max-w-[150px]"
                    href={item.url}
                  >
                    {item.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate max-w-[150px]">
                {splitPathname[lastIndex]}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
    </header>
  );
};
