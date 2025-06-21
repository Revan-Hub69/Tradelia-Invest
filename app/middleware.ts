import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Legge cookie di Supabase
  const supabaseToken = request.cookies.get("sb-access-token")?.value;

  // Se non loggato e tenta di entrare in /chat ➜ redirect a /login
  if (!supabaseToken && request.nextUrl.pathname.startsWith("/chat")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Altrimenti continua normalmente
  return NextResponse.next();
}

// Dichiara quali route usare col middleware
export const config = {
  matcher: ["/chat"],
};

