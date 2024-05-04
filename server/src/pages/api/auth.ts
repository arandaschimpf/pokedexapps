import type { APIRoute } from "astro"
import { authenticateUser } from "../../services/users"
import { redirectWithCookies } from "../../helpers/redirectWithCookies"
import { signJWT } from "../../helpers/jwt"

export const POST: APIRoute = async (context) => {
  //Parsea los datos
  const data = await context.request.formData()

  const email = data.get('email') as string
  const password = data.get('password') as string

  try {
    //Llama al servicio para autentificar.
    const user = await authenticateUser({ email, password })
    const jwt = signJWT(user)
    //Setea una cookie llamada usuario. 
    return redirectWithCookies('/admin', [{ name: 'user', value: jwt, maxAge: 60 * 60 * 24 }])
  } catch (error) {
    return context.redirect('/login?error=true')
  }

}