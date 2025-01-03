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
import {
  signInWithGithubAction,
  signInWithGoogleAction,
  signUpAction,
} from '@/app/actions';
import { toast } from 'react-toastify';
import { GithubLogo } from '@/components/github-logo';
import { GoogleLogo } from '@/components/google-logo';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const { error, message } = await signUpAction(values);
      if (error) {
        toast.error(message);
        router.refresh();
      } else {
        toast.success(message);
        router.push(`/sign-up?success=${encodeURIComponent(message)}`);
        router.refresh();
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Get started</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder=""
                      autoComplete="on"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Signing up...' : 'Create account'}
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={signInWithGoogleAction}
            >
              <GoogleLogo />
              Login with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={signInWithGithubAction}
            >
              <GithubLogo />
              Login with GitHub
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm">
          Already have an account?{' '}
          <a href="/sign-in" className="underline underline-offset-4">
            Sign in
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
