import { useState } from 'react';

export function SignUp(){
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
        const response = await fetch('http://localhost:3000/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error('Error al registrarse');
        }

        window.location.replace('/login');
      } catch (error) {
        setError('Hubo un error al registrarse. Inténtalo de nuevo.');
      }
    };
  
  
  
  return(  
    <div className='h-screen flex justify-center items-center bg-red-950'>
    <div className='flex flex-col items-center gap-5 bg-white p-5 rounded-lg'>
        <h2 className='text-red-900'>REGISTER</h2>
        {error && <p className='bg-red-600 text-white rounded-xl p-1'>{error}</p>}
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 items-center'>
            <label htmlFor="email">Email</label>
            <input className="border px-2 rounded-xl" type="email" id="email" name="email" required value={formData.email} onChange={handleChange}/>
            <label htmlFor="password">Password</label>
            <input className="border px-2 rounded-xl" type="password" id="password" name="password" required value={formData.password} onChange={handleChange}/>
            <button className="bg-red-600 text-white px-2 py-1 rounded-xl" type="submit">Register</button>
            </form>
        </div>
    </div>
  )
}