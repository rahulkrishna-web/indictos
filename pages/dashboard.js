import * as React from 'react';
import fb from '../firebase/clientApp';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import DashboardScreen from '../components/dashboardScreen';

const Dashboard = () => {
    const router = useRouter();
    const auth = getAuth(fb);
    const [user] = useAuthState(auth);
    return(
        <div>
            {user && <DashboardScreen />}
            
        </div>
    )
}

export default Dashboard

