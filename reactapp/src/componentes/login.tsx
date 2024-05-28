import { useNavigate } from "react-router-dom"


const BASE_URL = 'http://localhost:3000'

export const Login = () => {

  const navigate = useNavigate()
  async function logUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const user = {
      email: data.get('email') as string,
      password: data.get('password') as string
    }

    let log =await fetch(`${BASE_URL}/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    log.json().then(p => {
      console.log("then: ",p)
      if(log.status == 200){
        document.cookie = `user=${p}; max-age=${60 * 60 * 24}`    
        navigate('/admin')
      } else{
        alert("No se pudo iniciar sesión")
        form.reset()
      }       
  }) 
    

  }

    return(      
      <div className=" flex flex-col p-8 items-center justify-center bg-gray-400">
        
        <h1 className=" border-solid text-xl  text-white bg-gray-400">Login</h1>
        
        <form  onSubmit={logUser}>  
          <label htmlFor="email">Email</label>
          <p/>
          <input className="border px-2" type="email" id="email" name="email" required></input>
          <p/>
          <label htmlFor="password">Password</label>
          <p/>
          <input className="border px-2" type="password" id="password" name="password" required></input>
          <p/>        
      
          <button className=" ml-12 mt-5 bg-red-600 text-white px-2 py-1" type="submit">Iniciar Sesión</button>          
        </form>     

         <a href="/signup" className=" mt-5 text-sm text-white">Tiene una cuenta creada?</a>   
              
        

      </div>
    )
}