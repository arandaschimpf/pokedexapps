export type CookieData = {
  name: string
  value: string
  maxAge: number
}
// esto para mandar las cookies.
export function redirectWithCookies(location: string, cookies: CookieData[]) {
  const headers = new Headers()
  headers.append('Location', location)

  for (const cookie of cookies) {
    headers.append('Set-Cookie', `${cookie.name}=${cookie.value}; SameSite=Strict; Path=/; Max-Age=${cookie.maxAge}`)
  }// metadatos , para multiples paginas o una sola. HttpOnly (seguridad)
  return new Response(null, {
    status: 302,
    headers: headers
  })
  // la cookies se gaurdan en el navegdor, 
}