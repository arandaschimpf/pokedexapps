import {LoginButton} from "./login";
import { LogoutButton } from "./logout";
import { Profile } from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";



function App() {
    const {isAuthenticated} = useAuth0();
  return (
    <div className="App flex justify-center items-center h-screen">
        <header className="App-header">
            <div className="flex flex-col gap-4">
            {isAuthenticated? (<> 
            
                <div><Profile /></div>
                <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"><LogoutButton /></div>
                
            </>):(
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"><LoginButton /></div>
            )}
            </div>

        </header>
    </div>
    );
}

export default App;
