 import { Routes, Route } from "react-router-dom"
import { Signup } from "../componentes/signup"
import { Login } from "../componentes/login"
import { Admin } from "../componentes/admin"
 



//ESTE COMPONENTE NO VA A SER USADO, YA QUE PARA ESTA FUNCINALIDAD QUIERO ACCEDER SOLO AL SIGNUP
export const AppRouter = () => {  

    return(      
        //ESTABLESCO LAS POSIBLES RUTAS DE MI APLICACIÓN
        <Routes>
            <Route path= {"/signup"} element= {<Signup />} />  
            <Route path= {"/login"} element= {<Login />} />  
            <Route path= {"/admin"} element= {<Admin />} />  
        </Routes>
        

    )
} 