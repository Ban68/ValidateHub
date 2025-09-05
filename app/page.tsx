'use client';

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Validate-Hub</h1>
      <p className="mb-4">Welcome! Click the button below.</p>
      <Button onClick={() => console.log("Button clicked!")}>
        Click Me
      </Button>
    </main>
  );
}
