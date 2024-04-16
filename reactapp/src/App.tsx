import { useEffect, useState } from "react"





type Pokemon = {
  id: number
  name: string
}

const BASE_URL = 'http://localhost:4321/api'

export default function App() {               //el segundo parámetro es una función que va a reemplazar el estado anterior
  const [list, setList] = useState<Pokemon[]>([])   //set list encargado de actualizar nuestro componente, su estado inicial: <Pokemon[]>([]) 
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [e, setError] = useState("")
  const pageCount = Math.ceil(count / 5)

  useEffect(() => {         //CON ESTE USEEFFECT ACTUALIZO EL ESTADO
    let cancelled = false
    fetch(`${BASE_URL}/pokemon.json?page=${page}`)
      .then((res) => res.json())  //respuesta en json
      .then((data) => {
        if (!cancelled) {
          setList(data.list)

        }
      })

    return () => {
      cancelled = true
    }
  }, [page])



  async function addPokemon(event: React.FormEvent<HTMLFormElement>) {

    
    event.preventDefault()
    
    const form = event.currentTarget
    const data = new FormData(form)
    const pokemon = {
      id: parseInt(data.get('id') as string),
      name: data.get('name') as string
    }

     const result = await fetch(`${BASE_URL}/pokemon.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    })
    console.log(result);
    let error = ""
    const jso = await result.json()  //Llamo a la promesa como un json
    for(let i in jso){
      console.log("******",jso[i])
      error = jso[i]     
      alert(error) 
    }
    setError(error)
    

    form.reset()
    if (page === pageCount && list.length < 5) {
      setList(current => [...current, pokemon])
    }
    setCount(current => current + 1)
    
   /*
    const form = event.currentTarget
    const data = new FormData(form)
    let i = parseInt(data.get('id') as string)
    let nam= data.get('name') as string;
    let estado = true;
    let messageError = '';

    const nameTooLong = 'Name is too long';
    const nameTooShort = 'Name is too short';
    const pokemonAlreadyExists = 'Pokemon already exists'

    for(let poke in list){
      if((parseInt(poke) + 1) == i){estado = false;messageError=pokemonAlreadyExists }
      if(list[poke]["name"] == nam){estado = false; messageError=pokemonAlreadyExists}
    }

    if(nam.length <15 && nam.length >2 && estado ==true){     

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
    
    else if(nam.length >15){messageError=nameTooLong}
    else if(nam.length <2){messageError=nameTooShort}
    if(messageError != ''){return alert(messageError)}
    */
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



  return (
    <main className="container mx-auto flex flex-col">
		<h1 className="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
		<form action="http://localhost:4321/api/pokemon" method="post" onSubmit={addPokemon}>

			<h2 className="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
			<input type="number" name="id" placeholder="ID" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
			<input type="text" name="name" placeholder="Name" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
			<button type="submit" className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>
      <span id="errorMes"></span>

		</form>
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