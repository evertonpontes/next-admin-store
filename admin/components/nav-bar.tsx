'use client';

import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

export const NavBar = () => {
  const pathname = usePathname();
  const splitPathname = pathname
    .split('/')
    .slice(1)
    .map((route) => ({
      name: route,
      href: pathname.split(route)[0] + route,
    }));
  const lastIndex = splitPathname.length - 1;

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden md:block">
          <BreadcrumbList>
            {splitPathname.slice(0, lastIndex).map((path) => (
              <React.Fragment key={path.name}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={path.href}
                    className="truncate w-full max-w-[150px]"
                  >
                    {path.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate w-full max-w-[150px]">
                {splitPathname[lastIndex].name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
