import { SignOutButton } from '@/components/auth/sign-out-button';
import Link from 'next/link';

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between py-4">
          <nav className="flex gap-4 text-sm">
            <Link className="hover:underline" href="/app/dashboard">Dashboard</Link>
            <Link className="hover:underline" href="/app/organizations/new">Create Organization</Link>
            <Link className="hover:underline text-muted-foreground" href="/onboarding?force=true">Onboarding (dev)</Link>
          </nav>
          <SignOutButton />
        </div>
      </header>
      <main className="flex-1 container mx-auto py-8">{children}</main>
    </div>
  );
}

