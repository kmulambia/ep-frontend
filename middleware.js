// middleware.ts

import { NextResponse } from 'next/server'
import useCrypto from './services/crypto.service'

const cryptoService = new useCrypto();

export async function middleware(request, response) {

  var token = cryptoService.decrypt(request.cookies.get('KENTE'));
  var user = cryptoService.decrypt(request.cookies.get('RUER'));
  var acls = cryptoService.decrypt(request.cookies.get('ANKER'));
  var role = cryptoService.decrypt(request.cookies.get('BISQN'));
  var url = request.url;

  if (request.nextUrl.pathname == '/') {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (token && url.includes('/signin') && role) {
    return NextResponse.redirect(new URL('/' + role, request.url))
  }
  //admins
  if (!token && url.includes('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

}
