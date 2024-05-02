import App from './App.tsx';
import Signup from './components/Signup.tsx'
import Login from './components/Login.tsx'
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import { LOCALSTORAGE_TOKEN_KEY } from './utils/fetchClient.ts';


export default function Index(){

    async function BorrarToken(event: React.MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
      localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY)
      window.location.reload();
      window.location.href = 'http://localhost:5173/login'


    }
    return(
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/Home">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <button onClick={ BorrarToken }>Logout</button>
              </li>
            </ul>
          </nav>
  
          <Routes>
            <Route path="/Home" Component={App} />
            <Route path="/Login" Component={Login} />
            <Route path="/register" Component={Signup} />
            <Route Component={Index} />
          </Routes>
        </div>
      </Router>
    );
}