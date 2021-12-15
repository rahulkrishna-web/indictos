import React, { useEffect } from 'react';
import Link from 'next/link';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore"

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IndexAppbar from '../components/indexAppbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import fb from '../firebase/clientApp';

const auth = getAuth(fb);
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

  async function getUserByEmail(email) {
    // Make the initial query
    const query = await db.collection('users').where('email', '==', email).get();
  
     if (!query.empty) {
      const snapshot = query.docs[0];
      const data = snapshot.data();
      console.log(data)
    } else {
      // not found
    }
    
  }
  useEffect(()=>{
    getUserByEmail('test@test.com');
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
        Hello
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
