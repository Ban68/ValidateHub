'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function createOrgAndWorkspace(
  prevState: { success: boolean; error?: string },
  formData: FormData
) {
  try {
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

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Could not create organization and workspace.' };
  }
}