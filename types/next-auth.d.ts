import type { DefaultSession } from 'next-auth';
import type { Role } from '@prisma/client';

interface MembershipInfo {
  id: string;
  role: Role;
  organizationId: string;
  workspaceId?: string;
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
    membership?: MembershipInfo;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    membership?: MembershipInfo;
  }
}

