import { useEffect } from 'react'
import Router, {useRouter} from 'next/router'
import fb from '../firebase/clientApp';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import DashboardScreen from '../components/dashboardScreen';


const Dashboard = () => {
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
            {user && <DashboardScreen />}
            
        </div>
    )
}

export default Dashboard

