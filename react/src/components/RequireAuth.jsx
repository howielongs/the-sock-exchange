import { Navigate, useLocation} from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext'; //import the hook created earlier

const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();

    if(!auth?.user) {
        //redirect them to login page but save current location they were trying to go to after login
        return <Navigate to="/login" state = {{from: location }} replace />;
    }
    return children;
};

export default RequireAuth;
