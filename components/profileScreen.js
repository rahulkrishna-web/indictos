import React, { useEffect } from 'react';
import Link from 'next/link';
import { getFirestore, collection, doc, getDoc } from "firebase/firestore"

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

export default function ProfileScreen() {
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
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setValues({ ...values, user: docSnap.data() });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  useEffect(()=>{
    getUserByEmail(user.uid);
    });
  
  return (
    <div>
      <IndexAppbar />
      <Container maxWidth="sm">
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 500
        },
      }}
    >
      <Paper elevation={1} >
      <Box sx={{p: 2}}>
      <Typography variant="h3" gutterBottom component="div">
        {values.user.first_name} {values.user.last_name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        Register now and get exclusive conent.
      </Typography>
      </Box>
      
      
      </Paper>
    </Box>
      </Container>
    </div>
  );
}
