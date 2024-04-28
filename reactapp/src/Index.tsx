import App from './App.tsx';
import Signup from './components/Signup.tsx'
import Login from './components/Login.tsx'

import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';


export default function Index(){
    return(
      <Router>
        <div className="index">
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
                <Link to="">Logout</Link>
              </li>
            </ul>
          </nav>
  
          <Routes>
            <Route path="/Home" Component={App} />
            <Route path="/Login" Component={Login} />
            <Route path="/register" Component={Signup} />
            {/* <Route path="/logout" component={} /> */}
          </Routes>
        </div>
      </Router>
    );
}