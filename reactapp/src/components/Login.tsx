export default function Login(){
    return(

        <form action="/api/auth" method="post">
        <label form="email">Email</label>
        <input className="border px-2" type="email" id="email" name="email" required/>
        <label form="password">Password</label>
        <input className="border px-2" type="password" id="password" name="password" required/>
        <button className="bg-red-600 text-white px-2 py-1" type="submit">Iniciar sesion</button>
        </form>


    )


}