'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { forgotPasswordAction } from '@/app/actions';
import { toast } from 'react-toastify';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export const ForgotPasswordForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const { error, message } = await forgotPasswordAction(values.email);
      if (error) {
        toast.error(message);
        router.refresh();
      } else {
        toast.success(message);
        router.push(`/forgot-password?success=${encodeURIComponent(message)}`);
        router.refresh();
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Reset password</CardTitle>
        <CardDescription>
          Enter your email below to reset to your password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Reset Password'}
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <a href="/sign-up" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
