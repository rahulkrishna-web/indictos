import React, { useEffect } from "react";
import HomeLayout from "../layouts/homeLayout";
import Box from "@mui/material/Box";
import PlainLayout from "../layouts/plainLayout";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import fb from "../firebase/clientApp";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Admin() {
  const auth = getAuth(fb);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

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
    return (
      <>
        {user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
          <HomeLayout>
            <Container maxWidth="md" sx={{ py: 5 }}>
              <Typography align="center" variant="h3" gutterBottom>
                Admin
              </Typography>
              <Box
                sx={{
                  textAlign: "center",
                  justifyItems: "center",
                }}
              >
                hh
              </Box>
            </Container>
          </HomeLayout>
        )}
        {user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
          <PlainLayout>
            <Container maxWidth="md" sx={{ py: 5 }}>
              <Typography align="center" variant="h3" gutterBottom>
                403
              </Typography>
              <Box
                sx={{
                  textAlign: "center",
                  justifyItems: "center",
                }}
              >
                Not authorized
              </Box>
            </Container>
          </PlainLayout>
        )}
      </>
    );
  }
  return <div>not auth</div>;
}
