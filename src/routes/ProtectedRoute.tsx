import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

interface Props{
    children : React.ReactNode,
    replace : boolean,
}

const ProtectedRoute : React.FC<Props> = ({ children, replace}) => {
    const { currentUser } = useUserStore();

    if(!currentUser)
        return <Navigate to="/login" replace={replace}/>;

    return <>{children}</>;
}

export default ProtectedRoute;