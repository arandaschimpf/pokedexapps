import type { APIRoute } from "astro"
import { addData, getDataList, type Data } from "../../../services/data"

export const GET: APIRoute = async (context) => {
  const page = parseInt(context.url.searchParams.get('page') ?? '1', 10)

  return new Response(JSON.stringify((await getDataList(page))), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}

export const POST: APIRoute = async (context) => {
  const data = await context.request.json()

  await addData(data)

  return new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}