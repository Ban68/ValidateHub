'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { createOrgAndWorkspaceFromApp } from '../actions';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const initialState = { success: false, error: undefined as string | undefined };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create'}
    </Button>
  );
}

export default function CreateOrganizationPage() {
  const [state, formAction] = useFormState(createOrgAndWorkspaceFromApp, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      fetch('/api/auth/session?update').then(() => {
        router.replace('/app/dashboard');
      });
    }
  }, [state.success, router]);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Organization</h1>
      <p className="mb-6 text-sm text-muted-foreground">Create a new organization with its first workspace.</p>
      <form action={formAction} className="flex flex-col gap-4">
        <input
          name="orgName"
          placeholder="Organization Name"
          className="p-2 border rounded"
          required
        />
        <input
          name="workspaceName"
          placeholder="Workspace Name"
          className="p-2 border rounded"
          required
        />
        <SubmitButton />
        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
      </form>
    </div>
  );
}

