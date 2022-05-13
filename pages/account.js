import { useEffect } from "react";
import { useRouter } from "next/router";
import fb from "../firebase/clientApp";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import HomeLayout from "../layouts/homeLayout";
import AccountScreen from "../components/accountScreen";
import PlainLayout from "../layouts/plainLayout";
import { Container } from "@mui/material";

const Account = () => {
  const router = useRouter();
  const auth = getAuth(fb);
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);
  return (
    <div>
      {user && (
        <PlainLayout>
          <Container maxWidth="md" sx={{ py: 3 }}>
            <AccountScreen />
          </Container>
        </PlainLayout>
      )}
    </div>
  );
};

export default Account;
