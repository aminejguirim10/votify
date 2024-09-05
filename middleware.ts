import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // TODO: Try to fix the dynamic votingRooms protection
  const protectedRoutes = ["/votingRooms", "/votingRooms/:id*"]

  const authRoutes = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/reset-password/:path*",
  ]

  // Check if the request is for a protected route
  const isProtectedRoute = protectedRoutes.includes(path)

  // Check if the request is for an auth route
  const isAuthRoute = authRoutes.includes(path)

  // Get the authentication token
  const token = await getToken({ req: request })

  // If the request is for a protected route and the user is not authenticated, redirect to signin
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  // If the user is authenticated and trying to access a non-protected route, redirect to votingRooms
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/votingRooms", request.url))
  }

  // If none of the above conditions are met, continue with the request
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/votingRooms",
    "/votingRooms/:id",
    "/signin",
    "/signup",
    "/forgot-password",
    "/reset-password/:path*",
    "/",
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/(api|trpc)(.*)",
  ],
}
