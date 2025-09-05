'use client';

import { Button } from "@/components/ui/button";
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      window.location.href = '/app';
    }
  }, [status]);

  if (status === 'loading' || status === 'authenticated') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Validate-Hub</h1>
      <p className="mb-4">Welcome! Click the button below.</p>
      <Button onClick={() => window.location.href = '/sign-in'}>
        Get Started
      </Button>
    </main>
  );
}