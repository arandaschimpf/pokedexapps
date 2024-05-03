import { useEffect, useState } from "react"
import Signin from "./components/Signin"
import Cookies from "universal-cookie"

type Pokemon = {
  id: number
  name: string
}

export type User = {
  id: number,
  username: string,
  email: string,
  password: string
}

const BASE_URL = 'http://localhost:4321/api'

export default function App() {
  const  cookies = new Cookies()
  const [list, setList] = useState<Pokemon[]>([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [logOrSign, setlogOrSign] = useState(true)
  // Here, false will be that the user needs to sign up, true, will be that he needs to sign in
  const [user, setUser] = useState<string | null>(null)
  //Need to validate here if there is a cookie
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false)

  const pageCount = Math.ceil(count / 5)

  useEffect(() => {
    // let cancelled = false
    // getCookies();
    isUserLogged();
    // authenticate();
    // fetch(`${BASE_URL}/pokemon.json?page=${page}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (!cancelled) {
    //       setList(data.list)
    //       setCount(data.count)
    //     }
    //   })

    // return () => {
    //   cancelled = true
    // }
  }, [page]) 

  // const user: User = {
  //   id: 1,
  //   username: 'LaMMDG',
  //   email: 'gordo@gmial.com',
  //   password: 'gorditomiamor',

  // }



  const isUserLogged = () => {
    const jwt = cookies.get('user_token')
    // console.log(jwt)

    if(!jwt){
      console.log('No cookies')
      return false
    } else {
      console.log(jwt)
      return true
    }
  }

  async function addPokemon(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const pokemon = {
      id: parseInt(data.get('id') as string),
      name: data.get('name') as string
    }

    await fetch(`${BASE_URL}/pokemon.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    })

    form.reset()
    if (page === pageCount && list.length < 5) {
      setList(current => [...current, pokemon])
    }
    setCount(current => current + 1)
  }

  async function deletePokemon(id: number) {
    await fetch(`${BASE_URL}/pokemon/${id}.json`, {
      method: 'DELETE'
    })

    setList(current => current.filter(pokemon => pokemon.id !== id))
    setCount(current => current - 1)

    if (page >= pageCount) {
      setPage(page - 1)
    }
  }

  function getCookies() {
    if(document.cookie){
      const cookies = document.cookie.split(';');

      cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=')
        console.log(`${name}: ${value} yeah buddy`)
        
      });
      
    } else {
      console.log("TOP OF THE MORNING TO YA LADDEIS")
    }
  }

  // const authanticateLogIn = () => {
  //   if(!isLoggedIn){
  //     <Signin />
  //   }
  // }


  //Validate if there is a cookie

  // const Authenticate = () => {
    
  // }

  const toggleLogIn = () => {
    setisLoggedIn(true)
  }

    if(logOrSign) {
      return(<Signin 
        callback={setisLoggedIn}
      />)  
    } else {
      return(
        <main className="container mx-auto flex flex-col">
        <h1 className="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
        <form action="/api/pokemon" method="post" onSubmit={addPokemon}>
          <h2 className="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
          <input type="number" name="id" placeholder="ID" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
          <input type="text" name="name" placeholder="Name" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
          <button type="submit" className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>
        </form>
        <div>
    
        </div>
        <ul className="mt-4 border-4 border-red-700">
          <li className="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700">
            <span className="text-lg text-white font-extrabold w-1/3">ID</span>
            <span className="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
            <span className="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
          </li>
          {list.map(pokemon => (
            <li className="flex items-center justify-between border-b border-gray-300 p-2">
              <span className="text-lg text-red-600 font-bold w-1/3">{pokemon.id}</span>
              <span className="text-lg text-red-600 font-bold w-1/3 text-center">{pokemon.name}</span>
              <div className="w-1/3 text-right">
                <button onClick={() => deletePokemon(pokemon.id)} className="font-bold hover:font-extrabold">X</button>	
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center gap-2">
          <button onClick={() => setPage(c => Math.max(1, c - 1))} disabled={page === 1} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
          <span className="flex items-center self-stretch">{page}</span>
          <button onClick={() => setPage(c => Math.min(pageCount, c + 1))} disabled={page === pageCount} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
        </div>
      </main>
      
      )
    }
  }


  

