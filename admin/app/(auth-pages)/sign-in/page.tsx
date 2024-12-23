import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignInForm } from './signin-form';

export default async function LoginPage() {
  return (
    <div>
      <Card>
        <CardHeader className="space-y-0 flex flex-col items-center gap-2">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <SignInForm />
      </Card>
    </div>
  );
}
