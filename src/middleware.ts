import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  // Public routes
  if (
    request.nextUrl.pathname.startsWith('/api/auth/login') ||
    request.nextUrl.pathname.startsWith('/api/auth/register')
  ) {
    return NextResponse.next();
  }

  // Check auth for other routes
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('userId', (verified as any).userId);

    return NextResponse.next({
      headers: requestHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: '/api/:path*'
}