import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Login(){
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
      const [error, setError] = useState('');
    
      const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        try {
            console.log("Flag 04")
          const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
            // credentials: "include"
          });
           console.log("Flag 01")
          if (!response.ok) {
            console.log("Flag 02")
            throw new Error('Credenciales incorrectas');
          }
          console.log("Flag 03")
          const token = (await response.json())["accessToken"];
          window.localStorage.setItem("jwt", token);
          // console.log(response.headers);
          // console.log(response.headers.getSetCookie())
          // window.document.cookie = response.headers.get("Set-Cookie")!;
          window.location.replace('/');
        } catch (error) {
          setError('Credenciales incorrectas. Inténtalo de nuevo.');
        }
      };

    return(  
        <div className='h-screen flex justify-center items-center bg-red-950'>
            <div className='flex flex-col items-center gap-5 bg-white p-5 rounded-lg'>
                <h2 className='text-red-900'>LOGIN</h2>
                {error && <p className='bg-red-600 text-white rounded-xl p-1'>{error}</p>}
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3 items-center'>
                    <label htmlFor="email">Email</label>
                    <input className="border px-2 rounded-xl" type="email" id="email" name="email" required value={formData.email} onChange={handleChange}/>
                    <label htmlFor="password">Password</label>
                    <input className="border px-2 rounded-xl" type="password" id="password" name="password" required value={formData.password} onChange={handleChange}/>
                    <Link to="/admin" className='text-blue-900 italic'>Register</Link>
                    <button className="bg-red-600 text-white px-2 py-1 rounded-xl" type="submit">Iniciar sesion</button>
                    </form>
            </div>
        </div>
      )
}