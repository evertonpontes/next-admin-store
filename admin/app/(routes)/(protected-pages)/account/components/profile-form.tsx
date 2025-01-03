'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { Input } from '@/components/ui/input';
import { AvatarUploader } from '@/components/avatar-uploader';
import { useContext, useState } from 'react';
import { UserContext } from '@/contexts/user-context';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'react-toastify';

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  full_name: z
    .string()
    .min(3, { message: 'Full name must be at least 3 characters.' }),
  avatar_url: z.string(),
  website: z.string(),
});

export const ProfileForm = () => {
  const { user } = useContext(UserContext);

  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user ?? {
      username: '',
      email: '',
      full_name: '',
      avatar_url: '',
      website: '',
    },
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        username: values.username,
        full_name: values.full_name,
        avatar_url: values.avatar_url,
        website: values.website,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast.success('Profile updated!');
    } catch (error) {
      console.log(error);
      toast.error('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="avatar_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <AvatarUploader
                  uid={user.id}
                  url={field.value}
                  onUpload={(url) => {
                    field.onChange(url);
                  }}
                />
              </FormControl>
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
                <Input placeholder="usern" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
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
                <Input placeholder="m@example.com" {...field} disabled />
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
          name="full_name"
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
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter URL" {...field} />
              </FormControl>
              <FormDescription>
                Add links to your website, blog, or social media profiles.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving changes...' : 'Update profile'}
        </Button>
      </form>
    </Form>
  );
};
