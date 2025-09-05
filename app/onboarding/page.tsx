import { createOrgAndWorkspace } from './actions';
import { Button } from '@/components/ui/button';

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Onboarding</h1>
      <p className="mb-6">Create your first organization and workspace.</p>
      <form action={createOrgAndWorkspace} className="flex flex-col gap-4 w-80">
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
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
