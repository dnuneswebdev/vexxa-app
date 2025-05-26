import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/login'
  
  // Get token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  
  // Redirect logic
  if (isPublicPath && token) {
    // If user is authenticated and trying to access login page,
    // redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  if (!isPublicPath && !token) {
    // If user is not authenticated and trying to access a protected route,
    // redirect to login page
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  return NextResponse.next()
}

// Add the paths that should be checked by the middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/proposals/:path*',
    '/auth/login',
  ],
}
