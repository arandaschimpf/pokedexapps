   // src/App.tsx
import App from './Pokemon'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LOGIN from './Login';
import SIGNUP from './Signup';

function App2() {
return (
      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LOGIN/>}/>
          <Route path="/signup" element={<SIGNUP/>}/>
          <Route path="/home" element={<App
          />}/>
        </Routes>

        </BrowserRouter>
      </div>
    )
}
export default App2;