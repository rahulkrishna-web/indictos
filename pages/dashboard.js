import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import fb from "../firebase/clientApp";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import HomeLayout from "../layouts/homeLayout";
import DashboardScreen from "../components/dashboardScreen";
import PlainLayout from "../layouts/plainLayout";
import { Container } from "@mui/material";

const Dashboard = () => {
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
            <DashboardScreen />
          </Container>
        </PlainLayout>
      )}
    </div>
  );
};

export default Dashboard;
