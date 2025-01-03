'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { slugify } from '@/lib/utils';
import { KeywordsInput } from '@/components/ui/keywords-input';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Category } from '@/models/category';

const categoryBase = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  parentId: z.string(),
  slug: z
    .string()
    .min(3, { message: 'Slug must be at least 3 characters.' })
    .regex(/^[a-z0-9]+(?:(?:-|_)+[a-z0-9]+)*$/gm, {
      message: 'Slug can only contain lowercase letters, numbers, and dashes.',
    }),
  attributes: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters.' })
    .array(),
});

interface CategoryFormProps {
  data?: Category;
  categories: Category[];
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  data,
  categories,
}) => {
  const form = useForm<z.infer<typeof categoryBase>>({
    resolver: zodResolver(categoryBase),
    defaultValues: {
      name: data?.name || '',
      slug: data?.slug || '',
      parentId: data?.parent_id || '',
      attributes: data?.attributes.map((attr) => attr.name) || [],
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const dataMessage = {
    toastMessage: data
      ? 'Category updated successfully!'
      : 'Category created successfully!',
    toastError: 'Something went wrong.',
    button: data ? 'Update' : 'Create',
  };

  async function onSubmit(values: z.infer<typeof categoryBase>) {
    setIsLoading(true);
    try {
      if (data) {
        await axios.patch(
          `/api/stores/${params.storeId}/categories/${data.id}`,
          values
        );
      } else {
        await axios.post(`/api/stores/${params.storeId}/categories`, values);
      }
      toast.success(dataMessage.toastMessage);
      router.push(`/home/${params.storeId}/categories/`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(dataMessage.toastError);
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  function handleNameChange(value: string) {
    form.setValue('slug', slugify(value));
  }

  function handleAddKeyword(keyword: string) {
    form.setValue('attributes', [...form.getValues('attributes'), keyword]);
  }

  function handleRemoveKeyword(keyword: string) {
    form.setValue(
      'attributes',
      form.getValues('attributes').filter((k) => k !== keyword)
    );
  }

  function handleParentChange(value: string) {
    const attributes = categories.find((c) => c.id === value)?.attributes;

    if (attributes) {
      form.setValue(
        'attributes',
        attributes.map((attr) => attr.name)
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter name"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleNameChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Enter slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent category</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleParentChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {!categories ||
                  !categories.filter((c) => c.id !== data?.id) ? (
                    <SelectItem value="empty" disabled>
                      No categories
                    </SelectItem>
                  ) : (
                    categories
                      .filter((c) => c.id !== data?.id)
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attributes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attributes</FormLabel>
              <FormControl>
                <KeywordsInput
                  keywords={field.value}
                  addKeyword={handleAddKeyword}
                  removeKeyword={handleRemoveKeyword}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Separate attributes by pressing &apos;enter&apos; or
                &apos;tab&apos; key.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : dataMessage.button}
        </Button>
      </form>
    </Form>
  );
};
