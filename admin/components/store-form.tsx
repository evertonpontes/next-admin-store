'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import axios from 'axios';

import { Button } from '@/components/ui/button';
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
import { useStoreModal } from '@/hooks/use-store-modal';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Store } from '@/models/store';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  description: z.string(),
});

interface StoreFormProps {
  data?: Store;
}

export const StoreForm: React.FC<StoreFormProps> = ({ data }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data ?? {
      name: '',
      description: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { onClose } = useStoreModal();
  const router = useRouter();

  const dataMessage = {
    toastMessage: data
      ? 'Store updated successfully!'
      : 'Store created successfully!',
    toastError: 'Something went wrong.',
    button: data ? 'Update' : 'Create',
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (!data) {
        const response = await axios.post<Store>('/api/stores', values);
        router.push(`/home/${response.data.id}`);
      } else {
        const response = await axios.patch<Store>(
          `/api/stores/${data.id}`,
          values
        );
        router.push(`/home/${response.data.id}/settings`);
      }
      toast.success(dataMessage.toastMessage);
      onClose();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(dataMessage.toastError);
    } finally {
      setIsLoading(false);
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
                <Input placeholder="Enter name" {...field} />
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
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
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
