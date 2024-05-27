import { useState } from 'react';
import './Styles.css'; // Importa los estilos CSS
import { toast } from 'react-hot-toast';

const LoginPage = () => {

  interface Form {
    email: string;
    password: string;
    fullName?: string | null;
    phone?: string | null;
  }

  const initialForm: Form = {
    email: '',
    password: '',
    fullName: null,
    phone: null
  }

  const [form, setForm] = useState<Form>(initialForm);

  const handleSubmit = () => {

    const resp = fetch('http://localhost:3000/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    .then(data => {
      toast.success('User created successfully')
      console.log(data)
      // setForm(initialForm)
      // localStorage.setItem('token', '1234')
    })
    .catch(err => {
      toast.error('User not created')
      console.log(err)
    })
    console.log(resp)
    localStorage.setItem('token', '1234')
  }

  const handleLogin = () => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON from the response
    })
    .then(data => {
      // Guarda el token en el localStorage
      localStorage.setItem('token', data.token);
      console.log('Token guardado en el localStorage:', data.token);
    })
    .catch(error => {
      console.error('Hubo un problema con la petición fetch:', error);
    });
  

  return (
    <div className="login-page">
      <div className="form">
        <div className="section text-center">
          <h6 className="mb-0 pb-3">
            <span>Log In </span>
            <span>Sign Up</span>
          </h6>
          <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
          <label htmlFor="reg-log"></label>
          <div className="card-3d-wrap mx-auto">
            <div className="card-3d-wrapper">
              <div className="card-front">
                <div className="center-wrap">
                  <div className="section text-center">




                    <h4 className="mb-4 pb-3">Log In</h4>
                    <div className="form-group">
                      <input type="email" className="form-style" placeholder="Email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                      <i className="input-icon uil uil-at"></i>
                    </div>
                    <div className="form-group mt-2">
                      <input type="password" className="form-style" placeholder="Password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                      />
                      <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <button className="btn mt-4"
                      onClick={handleLogin}
                    >
                      Login
                    </button>

                    <p className="mb-0 mt-4 text-center">
                      <a href="#" className="link">Forgot your password?</a>
                    </p>
                  </div>



                </div>
              </div>
              <div className="card-back">
                <div className="center-wrap">
                  <div className="section text-center">



                    <h4 className="mb-3 pb-3">Sign Up</h4>
                    <div className="form-group">
                      <input type="text" className="form-style" placeholder="Full Name"
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      />
                      <i className="input-icon uil uil-user"></i>
                    </div>
                    <div className="form-group mt-2">
                      <input type="tel" className="form-style" placeholder="Phone Number"
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                      <i className="input-icon uil uil-phone"></i>
                    </div>
                    <div className="form-group mt-2">
                      <input type="email" className="form-style" placeholder="Email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                      <i className="input-icon uil uil-at"></i>
                    </div>
                    <div className="form-group mt-2">
                      <input type="password" className="form-style" placeholder="Password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                      />
                      <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <button className='btn mt-4'
                      onClick={handleSubmit}
                    >
                      Register
                    </button>
                  </div>



                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
}
export default LoginPage;