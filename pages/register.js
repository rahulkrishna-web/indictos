import Router, {useRouter} from 'next/router'
import RegisterScreen from '../components/registerScreen'
import fb from '../firebase/clientApp';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const Register = () => {
    const router = useRouter();
    const auth = getAuth(fb);
    const [user] = useAuthState(auth);
    if(user){
        router.push('/dashboard')
    }
    return(
        <div>
            {!user && <RegisterScreen />}
            
        </div>
    )
}

export default Register

