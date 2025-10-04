import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/error"];

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  if (!host) {
    return NextResponse.redirect(new URL("/error", request.url));
  }

  try {
    const { pathname } = request.nextUrl;

    const session = request.cookies.get("token")?.value;

    const isPublicRoute = publicRoutes.includes(pathname);

    // Redireciona para login se não estiver autenticado e tentar acessar uma rota protegida
    if (!isPublicRoute && !session) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);

    const errorUrl = new URL("/error", request.url);
    errorUrl.searchParams.set("message", "Ocorreu um erro inesperado");
    return NextResponse.redirect(errorUrl);
  }
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    },
  ],
};
