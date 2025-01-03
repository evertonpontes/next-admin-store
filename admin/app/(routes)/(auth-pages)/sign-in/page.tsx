import React from 'react';
import { SignInForm } from './signin-form';

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <SignInForm />
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
