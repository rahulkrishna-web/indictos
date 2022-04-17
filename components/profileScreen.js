import React, { useEffect } from "react";
import Link from "next/link";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IndexAppbar from "../components/indexAppbar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import fb from "../firebase/clientApp";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { TextField } from "@mui/material";

const db = getFirestore();

export default function ProfileScreen() {
  const [values, setValues] = React.useState({
    name: "",
    mobile: "",
    email: "",
    username: "",
    password: "",
    loading: false,
    showPassword: false,
    user: {},
  });

  const auth = getAuth(fb);
  const [user] = useAuthState(auth);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const saveProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: values.name,
      phoneNumber: values.mobile,
    })
      .then((res) => {
        console.log("profile updated", res);
        // ...
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    setValues({
      ...values,
      name: user.displayName,
      email: user.email,
      mobile: user.phoneNumber,
    });
  }, [user]);

  return (
    <div>
      <Box>
        <Paper elevation={0}>
          <Box sx={{ p: 2 }}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              margin="dense"
              fullWidth
              value={values.name}
              onChange={handleChange("name")}
            />

            <TextField
              id="email"
              label="Email"
              variant="outlined"
              margin="dense"
              fullWidth
              value={values.email}
              onChange={handleChange("email")}
            />
            <TextField
              id="mobile"
              label="Mobile"
              variant="outlined"
              margin="dense"
              fullWidth
              value={values.mobile}
              onChange={handleChange("mobile")}
            />
            <Button variant="contained" onClick={saveProfile}>
              Save
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
