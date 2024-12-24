'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { api, slugify } from '@/lib/utils';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.'),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters.')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be a valid slug.'),
  description: z.string(),
});

export const StoreForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    },
  });

  const route = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await api.post('/api/stores', values);
    route.refresh();
    console.log(res);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const slug = slugify(value);
    form.setValue('slug', slug);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter name"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(e);
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
                <Input placeholder="store-slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your store..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button>Create store</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export const DeleteStore = () => {
  const { onClose, setCommand, storeId, setStoreId } = useStoreModal();

  const [isLoading, setIsLoading] = React.useState(false);

  const route = useRouter();

  const handleCancel = () => {
    setCommand('create');
    setStoreId(null);
    onClose();
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await api.delete(`/api/stores/${storeId}`);
      route.refresh();
      route.push(`/home?success=${encodeURIComponent(res.data)}`);
      toast.success(res.data);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
      handleCancel();
    }
  };

  return (
    <div className="flex items-center space-x-2 w-full max-w-[200px] mx-auto">
      <Button
        variant={'destructive'}
        size={'sm'}
        className="flex-1"
        onClick={handleDelete}
        disabled={isLoading}
      >
        {isLoading ? 'Deleting...' : 'Yes'}
      </Button>
      <Button
        variant={'outline'}
        size={'sm'}
        className="flex-1"
        onClick={handleCancel}
        disabled={isLoading}
      >
        No
      </Button>
    </div>
  );
};
