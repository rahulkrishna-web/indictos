import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import signInScreen from '../components/loginScreen';
import fb from '../firebase/clientApp';

const auth = getAuth(fb)

const Auth = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    router.push({
        pathname: '/'
    })
  }
  return <signInScreen />;
};

export default Auth