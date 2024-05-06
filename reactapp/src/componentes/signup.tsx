import { useNavigate } from "react-router-dom"


const BASE_URL = 'http://localhost:3000'

export const Signup = () => {

  const navigate = useNavigate()
  async function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const user = {
      email: data.get('email') as string,
      password: data.get('password') as string
    }



    let sig =await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    console.log(sig.status)
    if(sig.status == 200){
      navigate('/login')
    } else{
      alert("no se pudo crear user")
    }


    
    form.reset()
  }
    

    return(   
      <div className=" flex flex-col p-8 items-center justify-center bg-gray-400">
        
        <h1 className=" border-solid text-xl  text-white bg-gray-400">Signup</h1>
        <form  onSubmit={createUser}>  
          <label htmlFor="email">Email</label>
          <p/>
          <input className="border px-2" type="email" id="email" name="email" required></input>
          <p/>
          <label htmlFor="password">Password</label>
          <p/>
          <input className="border px-2" type="password" id="password" name="password" required></input>
          <p/>
          
          <button className=" ml-12 mt-5 bg-blue-600 text-white px-2 py-1" type="submit">Registrarse</button>
        </form>   
        <a href="/login" className=" m-5 text-sm text-white">Ya tengo mi cuenta creada</a>   
                 

      </div>
    )
}