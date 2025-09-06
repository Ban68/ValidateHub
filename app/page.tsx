'use client';

import { Button } from "@/components/ui/button";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (status === 'authenticated') {
      router.push('/app');
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Validate-Hub</h1>
      <p className="mb-4">Welcome! Click the button below.</p>
      <Button onClick={handleClick}>
        Get Started
      </Button>
    </main>
  );
}
