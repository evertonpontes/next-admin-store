'use server';

import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

type SignUpForm = {
  email: string;
  password: string;
};

type SignInForm = {
  email: string;
  password: string;
};

export const signUpAction = async (values: SignUpForm) => {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { error } = await supabase.auth.signUp({
    ...values,
    options: {
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return {
      error: error.code,
      message: error.message,
    };
  } else {
    return {
      message:
        'Thanks for signing up! Please check your email for a verification link.',
    };
  }
};

export const signInAction = async (values: SignInForm) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    ...values,
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return {
      error: error.code,
      message: error.message,
    };
  } else {
    return {
      message: 'Successfully signed in!',
    };
  }
};

export const forgotPasswordAction = async (email: string) => {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/api/auth/callback?redirect_to=/account/reset-password`,
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return {
      error: error.code,
      message: error.message,
    };
  } else {
    return {
      message: 'Check your email for a link to reset your password.',
    };
  }
};

export const resetPasswordAction = async (password: string) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    console.log(error.code + ' ' + error.message);
    return {
      error: error.code,
      message: 'Password update failed: ' + error.message,
    };
  } else {
    return {
      message: 'Password updated successfully!',
    };
  }
};

export const signInWithGoogleAction = async () => {
  const origin = (await headers()).get('origin');
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: `${origin}/api/auth/callback`,
    },
  });
  if (error) {
    console.error(error.code + ' ' + error.message);
    return {
      error: error.code,
      message: error.message,
    };
  } else {
    redirect(data.url);
  }
};

export const signInWithGithubAction = async () => {
  const origin = (await headers()).get('origin');
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: `${origin}/api/auth/callback`,
    },
  });
  if (error) {
    console.error(error.code + ' ' + error.message);
    return {
      error: error.code,
      message: error.message,
    };
  } else {
    redirect(data.url);
  }
};

export const getUserAction = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error.code + ' ' + error.message);
  }
  return {
    user: data.user,
  };
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/sign-in');
};
