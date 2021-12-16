import RegisterScreen from '../components/registerScreen'
import fb from '../firebase/clientApp';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const Register = () => {
    const auth = getAuth(fb);
    const [user] = useAuthState(auth);

    return(
        <div>
            {user && (()=>{console.log("User found",user)})}
            {!user && <RegisterScreen />}
            
        </div>
    )
}

export default Register

