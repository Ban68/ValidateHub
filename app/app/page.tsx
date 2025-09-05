import { getCurrentContext } from '@/lib/session';
import { SignOutButton } from '@/components/auth/sign-out-button';
import { redirect } from 'next/navigation';

export default async function AppPage() {
  const context = await getCurrentContext();

  if (!context) {
    return redirect('/sign-in');
  }

  const { session, organization, workspace } = context;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center p-4">
        <p className="mb-2">Signed in as {session.user?.email}</p>
        <h1 className="text-2xl font-bold">
          Org: {organization?.name} &middot; Workspace: {workspace?.name}
        </h1>
        <div className="mt-6">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
