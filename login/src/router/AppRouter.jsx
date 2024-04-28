import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth";
import { PokemonPage } from "../pokemon";


export const AppRouter = () => {
    const authStatus = 'not-authenticated';
    return (
        <Routes>
            {
                (authStatus === 'not-authenticated') 
                ?<Route path="/auth/*" element={<LoginPage />} />
                :<Route path="/*" element={<PokemonPage />} /> 
            }

            <Route  path='/*' element={ <Navigate to="/auth/login" /> } />
        </Routes>
  )
}
