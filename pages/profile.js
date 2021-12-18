import { useEffect } from 'react'
import {useRouter} from 'next/router'
import fb from '../firebase/clientApp';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import HomeLayout from '../layouts/homeLayout'
import ProfileScreen from '../components/profileScreen';

const Profile = () => {
    const router = useRouter();
    const auth = getAuth(fb);
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (!(user)) {
          router.push('/auth')
        }
      }, [user,router])
    return(
        <div>
            {user && <HomeLayout><ProfileScreen /></HomeLayout>}
            
        </div>
    )
}

export default Profile

