export const LOCALSTORAGE_TOKEN_KEY = 'token'
export async function fetchAPI(url:string, options: Record<string,any> = {}) {
  const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
  return  fetch(`http://localhost:4000/`, {
    headers: {
      Authorization: token ?  `Bearer ${token}` : ''
    },
      ...options,
    }).then((r) => r.ok ? r.json() : Promise.reject(r))
  }
  
  
  