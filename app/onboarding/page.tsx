'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createOrgAndWorkspace } from './actions';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const initialState = { success: false, error: undefined };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create'}
    </Button>
  );
}

export default function OnboardingPage() {
  const [state, formAction] = useFormState(createOrgAndWorkspace, initialState);

  useEffect(() => {
    if (state.success) {
      fetch('/api/auth/session?update').then(() => {
        window.location.href = '/app';
      });
    }
  }, [state.success]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Onboarding</h1>
      <p className="mb-6">Create your first organization and workspace.</p>
      <form action={formAction} className="flex flex-col gap-4 w-80">
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
        {state.error && <p className="text-red-500">{state.error}</p>}
      </form>
    </div>
  );
}
