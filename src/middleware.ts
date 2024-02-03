import type { NextRequest } from 'next/server'
import { isAuthenticated } from './lib/auth'

export const config = {
  matcher: ['/dashboard/:path*',"/projects/:path*"],
}

export function middleware(request: NextRequest) {

  if (!isAuthenticated()) {
    return Response.json(
      { success: false, message: 'authentication failed' },
      { status: 401 }
    )
  }
}