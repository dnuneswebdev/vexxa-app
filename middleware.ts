import {NextResponse} from "next/server";
import {NextRequest} from "next/server";
import {getToken} from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login";

  // Get token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Verificar se o token não é válido ou expirou
  let isValidToken = false;
  if (token) {
    // Verifica se a sessão ainda é válida (8 horas)
    if (token.sessionStart) {
      const sessionAge = Date.now() - (token.sessionStart as number);
      const maxAge = 8 * 60 * 60 * 1000; // 8 horas em milliseconds
      isValidToken = sessionAge <= maxAge;
    } else {
      // Token sem sessionStart é considerado inválido
      isValidToken = false;
    }
  }

  // Redirect logic
  if (isPublicPath && isValidToken) {
    // If user is authenticated and trying to access login page,
    // redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isPublicPath && !isValidToken) {
    // If user is not authenticated and trying to access a protected route,
    // redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Add the paths that should be checked by the middleware
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/proposals/:path*",
    "/account/:path*",
    "/login",
  ],
};
