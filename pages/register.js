import * as React from 'react';
import { useRouter } from 'next/router';
import IndexAppbar from '../components/indexAppbar'
import RegisterScreen from '../components/registerScreen'
import fb from '../firebase/clientApp';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const Register = () => {
    const router = useRouter();
    const auth = getAuth(fb);
    const [user] = useAuthState(auth);
    if (user) {
        router.push({
            pathname: '/'
        })
      }
    return(
        <div>
            {!user && <RegisterScreen />}
            
        </div>
    )
}

export default Register

