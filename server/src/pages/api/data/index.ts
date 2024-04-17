import type { APIRoute } from "astro";
import { addData, findDataById, findDataByName } from "../../../services/data";
import { invalidInput, nameTooLong, nameTooShort, dataAlreadyExists } from "../../../helpers/errors";

function handleError(error: string, body?: Record<string, any>) {
  const headers = new Headers()
  headers.append('Location', '/')
  headers.append('Set-Cookie', `error=${error}; SameSite=Strict; Path=/; Max-Age=1`)
  if (body) {
    headers.append('Set-Cookie', `body=${JSON.stringify(body)}; SameSite=Strict; Path=/; Max-Age=1`)
  }
  return new Response(null, {
    status: 302,
    headers: headers
  })
}

export const POST: APIRoute = async (context) => {
  const dataField = await context.request.formData()

  const id = parseInt(dataField.get('id') as string)
  const name = dataField.get('name') as string

  if (!id || !name) {
    return handleError(invalidInput, { id, name })
  }

  if (name.length > 30) {
    return handleError(nameTooLong, { id, name })
  }

  if (name.length < 3) {
    return handleError(nameTooShort, { id, name })
  }

  if (await findDataById(id) || await findDataByName(name)) {
    return handleError(dataAlreadyExists, { id, name })
  }

  const data = { id, name }
  await addData(data)

  return context.redirect('/')
}