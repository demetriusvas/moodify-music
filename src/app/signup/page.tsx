import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
       <div className="w-full max-w-md space-y-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Icons.logo className="h-12 w-12 text-primary" />
          <h1 className="text-3xl font-bold">Moodify</h1>
        </div>
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your information to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Your Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </CardContent>
        </Card>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <Link href="/" className="underline">
            Back to Home
          </Link>
        </div>
       </div>
    </div>
  );
}
