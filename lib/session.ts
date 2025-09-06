import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { prisma } from './prisma';

export async function getCurrentContext() {
  const session = await getServerSession(authOptions);

  const membership = session?.membership;

  if (!membership?.organizationId || !membership?.workspaceId) {
    return null;
  }

  const [organization, workspace] = await Promise.all([
    prisma.organization.findUnique({ where: { id: membership.organizationId } }),
    prisma.workspace.findUnique({ where: { id: membership.workspaceId } }),
  ]);

  if (!organization || !workspace) {
    return null;
  }

  return {
    session,
    organization,
    workspace,
  };
}
