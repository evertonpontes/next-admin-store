import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignUpForm } from './signup-form';

export default async function SignUpPage() {
  return (
    <div>
      <Card>
        <CardHeader className="space-y-0 flex flex-col items-center gap-2">
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <SignUpForm />
      </Card>
    </div>
  );
}
