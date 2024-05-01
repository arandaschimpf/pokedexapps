'use client'
import { fetchAPI } from "@/utils/fetchAPI"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetchAPI('login');
      console.log('Inicio de sesión exitoso:', response);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  return (
    <div className="text-white">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} action={Login}>
        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" placeholder="Correo electronico" required />
        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Contraseña" name="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}