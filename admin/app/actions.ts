'use server';

import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

export async function signUpAction(values: SignUpProps) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    ...values,
    options: {
      data: {
        full_name: values.name,
      },
    },
  });

  if (error) {
    console.error('SIGN_UP ERROR: ', error);
    return {
      error: error.name,
      message: error.message,
    };
  } else {
    return {
      message:
        'Thanks for signing up! Please check your email for a verification link.',
    };
  }
}

type SignInProps = {
  email: string;
  password: string;
};

export async function signInAction(values: SignInProps) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(values);

  if (error) {
    console.error('SIGN_IN ERROR: ', error);
    return {
      error: error.name,
      message: 'Invalid email or password.',
    };
  } else {
    return {
      message: 'User logged in successfully!',
    };
  }
}

export async function forgotPasswordAction(email: string) {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/api/auth/callback?redirect_to=/account/reset-password`,
  });

  if (error) {
    console.error('FORGOT_PASSWORD ERROR: ', error);
    return {
      error: error.name,
      message: error.message,
    };
  } else {
    return {
      message: 'Check your email for a link to reset your password.',
    };
  }
}

export async function resetPasswordAction(password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    console.error('RESET_PASSWORD ERROR: ', error);
    return {
      error: error.name,
      message: error.message,
    };
  } else {
    return {
      message: 'Password updated successfully!',
    };
  }
}

export async function signInWithGoogleAction() {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { error, data } = await supabase.auth.signInWithOAuth({
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
    console.error('SIGN_IN_OAUTH ERROR: ', error);
    return {
      error: error.name,
      message: error.message,
    };
  } else {
    redirect(data.url);
  }
}

export async function signInWithGithubAction() {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { error, data } = await supabase.auth.signInWithOAuth({
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
    console.error('SIGN_IN_OAUTH ERROR: ', error);
    return {
      error: error.name,
      message: error.message,
    };
  } else {
    redirect(data.url);
  }
}
