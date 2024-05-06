import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({
    canActive,
    redirectPath = '/'
}) => {
    if(!canActive) {
        return <Navigate />
    }
    
}

export default ProtectedRoute;

