export const LOCALSTORAGE_TOKEN_KEY = 'token'
export async function fetchClient(url: string, options: Record<string, any> = {}) {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
    return fetch('http://localhost:4321/'+url, {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
        },
        ...options
    }).then((r) => r.ok ? r.json() : Promise.reject(r))
}