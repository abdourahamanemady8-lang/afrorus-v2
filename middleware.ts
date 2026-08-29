import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale, locales } from './src/i18n/config';

function resolveLocale(request: NextRequest) {
  const saved = request.cookies.get('afrorus_locale')?.value;
  if (saved && isLocale(saved)) return saved;

  const languages = request.headers.get('accept-language')?.toLowerCase() ?? '';
  const preferred = locales.find((locale) => languages.includes(locale));
  return preferred ?? defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split('/')[1];

  if (isLocale(firstSegment)) {
    const response = NextResponse.next();
    response.cookies.set('afrorus_locale', firstSegment, { path: '/', sameSite: 'lax', maxAge: 31536000 });
    return response;
  }

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
