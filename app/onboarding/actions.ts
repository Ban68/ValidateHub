'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

export async function createOrgAndWorkspace(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  const orgName = formData.get('orgName') as string;
  const workspaceName = formData.get('workspaceName') as string;

  if (!orgName || !workspaceName) {
    throw new Error('Organization and workspace names are required');
  }

  await prisma.organization.create({
    data: {
      name: orgName,
      memberships: {
        create: {
          userId: session.user.id,
          role: Role.OWNER,
        },
      },
      workspaces: {
        create: {
          name: workspaceName,
        },
      },
    },
  });

  redirect('/app');
}
