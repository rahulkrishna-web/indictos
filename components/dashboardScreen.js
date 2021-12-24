import React, { useEffect } from 'react';
import Link from 'next/link';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from "firebase/firestore"

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IndexAppbar from '../components/indexAppbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import fb from '../firebase/clientApp';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const db = getFirestore();

export default function DashboardScreen() {
  const [values, setValues] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    loading: false,
    showPassword: false,
    user: {}
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

  async function getUserByEmail(user) {
    // Make the initial query
    console.log("checkpoint1",user);
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if(!(querySnapshot)){
      console.log("no document found");
    }
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }
  useEffect(()=>{
    getUserByEmail(user);
    });
  
  return (
    <div>
      <Box>
      <Paper elevation={0} >
      <Box sx={{p: 2}}>
      <Typography variant="h3" gutterBottom component="div">
        Hello {user.displayName}!
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        Register now and get exclusive conent.
      </Typography>
      </Box>
      
      
      </Paper>
    </Box>
    </div>
  );
}
