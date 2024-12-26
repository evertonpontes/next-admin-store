'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React, { useCallback, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'react-toastify';
import { AvatarUploader } from '@/components/avatar-uploader';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3, 'Username must be at least 3 characters.'),
  full_name: z.string().min(3, 'Full name must be at least 3 characters.'),
  avatar_url: z.string(),
  website: z.string(),
});

interface AccountFormProps {
  user: User | null;
}

export const AccountForm = ({ user }: AccountFormProps) => {
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || '',
      username: '',
      full_name: '',
      avatar_url: '',
      website: '',
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  const getProfile = useCallback(async () => {
    try {
      setIsMounted(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        form.setValue('full_name', data.full_name || '');
        form.setValue('username', data.username || '');
        form.setValue('website', data.website || '');
        form.setValue('avatar_url', data.avatar_url || '');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error loading user data!');
    } finally {
      setIsLoading(false);
    }
  }, [supabase, user]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  const route = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('values', values);
      setIsLoading(true);

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: values.full_name,
        username: values.username,
        website: values.website,
        avatar_url: values.avatar_url,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      route.refresh();
      toast.success('Profile updated!');
    } catch (error) {
      console.error(error);
      toast.error('Error updating the data!');
    } finally {
      setIsLoading(false);
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="avatar_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <AvatarUploader
                  uid={user?.id}
                  url={field.value}
                  onUpload={(path) => {
                    form.setValue('avatar_url', path);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} disabled />
              </FormControl>
              <FormDescription>
                You can manage verified email addresses in your email settings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="Enter your website url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Update profile'}
        </Button>
      </form>
    </Form>
  );
};
