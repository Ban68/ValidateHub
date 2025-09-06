import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;
  const forceOnboarding = url.searchParams.get('force') === 'true';
  
  // Allow public routes
  if (pathname === '/' || pathname.startsWith('/api/health')) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Signed-in users trying to access sign-in page are redirected to app
  if (token && pathname.startsWith('/sign-in')) {
    return NextResponse.redirect(new URL('/app', req.url));
  }

  // Protect /app and /onboarding routes
  if (pathname.startsWith('/app') || pathname.startsWith('/onboarding')) {
    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    const hasMembership = token?.membership;

    if (pathname.startsWith('/app') && !hasMembership) {
      return NextResponse.redirect(new URL('/onboarding', req.url));
    }

    if (pathname.startsWith('/onboarding') && hasMembership && !forceOnboarding) {
      return NextResponse.redirect(new URL('/app', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*', '/onboarding', '/sign-in', '/', '/api/health'],
};
