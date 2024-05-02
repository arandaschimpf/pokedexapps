import React from "react";
import { useAuth0, LogoutOptions } from "@auth0/auth0-react";

interface CustomLogoutOptions extends LogoutOptions {
    returnTo?: string;
}

const LogoutButton: React.FC = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
        const options: CustomLogoutOptions = { returnTo: window.location.origin };
        logout(options);
    };

    return (
        <button onClick={handleLogout}>Cerrar sesión</button>
    );
}

export default LogoutButton;
