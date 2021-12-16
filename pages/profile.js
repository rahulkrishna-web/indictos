import fb from '../firebase/clientApp';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import ProfileScreen from '../components/profileScreen';

const Profile = () => {
    const auth = getAuth(fb);
    const [user] = useAuthState(auth);
    
    return(
        <div>
            {user && <ProfileScreen />}
            
        </div>
    )
}

export default Profile

