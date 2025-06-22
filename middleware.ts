import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Define public routes (accessible to all users)
  const publicRoutes = ['/']
  const publicRoutePrefixes = [
  '/notes/generate',
  '/api/notes',
  '/api/video', 
  '/api/transcript' 
]; 
  const authRoutes = ['/login', '/register']
  
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)
  const isPublicRoutePrefix = publicRoutePrefixes.some(prefix => 
    request.nextUrl.pathname.startsWith(prefix)
  )
  const isAuthRoute = authRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  // Redirect authenticated users away from login/register pages
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // Allow access to public routes and public route prefixes for everyone
  if (isPublicRoute || isPublicRoutePrefix) {
    return supabaseResponse
  }

  // Allow access to auth routes for unauthenticated users
  if (!user && isAuthRoute) {
    return supabaseResponse
  }

  if (!user && !isAuthRoute && !isPublicRoute && !isPublicRoutePrefix) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('message', 'Authentication required')
    url.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}