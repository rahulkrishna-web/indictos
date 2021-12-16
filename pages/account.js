import * as React from 'react';
import { useRouter } from 'next/router';
import fb from '../firebase/clientApp';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import AccountScreen from '../components/accountScreen';

const Account = () => {
    const router = useRouter();
    const auth = getAuth(fb);
    const [user] = useAuthState(auth);
    if (!user) {
        router.push({
            pathname: '/auth'
        })
      }
    return(
        <div>
            {user && <AccountScreen />}
            
        </div>
    )
}

export default Account

