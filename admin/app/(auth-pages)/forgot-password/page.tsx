import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ForgotPasswordForm } from './forgot-password-form';

export default async function ForgotPasswordPage() {
  return (
    <div>
      <Card>
        <CardHeader className="space-y-0 flex flex-col items-center gap-2">
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your email below to reset to your password
          </CardDescription>
        </CardHeader>
        <ForgotPasswordForm />
      </Card>
    </div>
  );
}
