'use client';

import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface KeywordsInputProps extends React.HTMLAttributes<HTMLInputElement> {
  keywords: string[];
  addKeyword: (keyword: string) => void;
  removeKeyword: (keyword: string) => void;
}

export const KeywordsInput: React.FC<KeywordsInputProps> = ({
  className,
  keywords = [],
  addKeyword,
  removeKeyword,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      if (inputValue.trim() && !keywords.includes(inputValue)) {
        addKeyword(inputValue);
        setInputValue('');
      }
    } else if (
      event.key === 'Backspace' &&
      !inputValue &&
      keywords.length > 0
    ) {
      removeKeyword(keywords[keywords.length - 1]);
    }
  }

  function handleWrapperClick() {
    inputRef?.current?.focus();
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          'bg-background flex flex-wrap items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          className
        )}
        onClick={handleWrapperClick}
      >
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="inline-flex items-center m-1 px-2 py-1 rounded-full text-sm bg-primary text-primary-foreground"
          >
            {keyword}
            <button
              type="button"
              className="ml-1 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                removeKeyword(keyword);
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        ))}
        <Input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onChange={handleValueChange}
          value={inputValue}
          className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          {...props}
        />
      </div>
    </div>
  );
};
