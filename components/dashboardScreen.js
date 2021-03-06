import React, { useEffect } from "react";
import Link from "next/link";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IndexAppbar from "../components/indexAppbar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import fb from "../firebase/clientApp";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const db = getFirestore();

export default function DashboardScreen() {
  const [values, setValues] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    loading: false,
    showPassword: false,
    user: {},
  });

  const auth = getAuth(fb);
  const [user] = useAuthState(auth);

  return (
    <div>
      <Box>
        <Paper
          elevation={0}
          sx={{ mb: 2, background: "#1e1d26", color: "#fff" }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom component="div">
              Hello {user.displayName}!
            </Typography>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
