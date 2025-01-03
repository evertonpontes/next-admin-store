'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';

const ThemeRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid max-w-md grid-cols-2 gap-2 pt-2', className)}
      {...props}
      ref={ref}
    />
  );
});
ThemeRadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const ThemeRadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn('relative', className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="absolute w-full h-full flex items-center justify-center rounded-md border-2 border-current text-current" />
      {props.children}
    </RadioGroupPrimitive.Item>
  );
});
ThemeRadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const ThemeRadioGroupBgLight = () => {
  return (
    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]"></div>
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]"></div>
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]"></div>
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
        </div>
      </div>
    </div>
  );
};

const ThemeRadioGroupBgDark = () => {
  return (
    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-slate-400"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-400"></div>
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-400"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-400"></div>
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-400"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-400"></div>
        </div>
      </div>
    </div>
  );
};

export {
  ThemeRadioGroup,
  ThemeRadioGroupItem,
  ThemeRadioGroupBgLight,
  ThemeRadioGroupBgDark,
};
