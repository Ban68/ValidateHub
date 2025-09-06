import { getCurrentContext } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const context = await getCurrentContext();
  if (!context) {
    return redirect('/sign-in');
  }
  const { session, organization, workspace } = context;

  return (
    <div className="text-center p-4">
      <p className="mb-2">Signed in as {session?.user?.email}</p>
      <h1 className="text-2xl font-bold">
        Org: {organization?.name} &middot; Workspace: {workspace?.name}
      </h1>
    </div>
  );
}

