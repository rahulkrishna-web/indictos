import * as React from 'react';
import Link from 'next/link';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IndexAppbar from '../components/indexAppbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import fb from '../firebase/clientApp';

const auth = getAuth(fb);
const db = getDatabase();

export default function RegisterScreen() {
  const [values, setValues] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    loading: false,
    showPassword: false,
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

  const  writeUserData = (userId) => {
    const db = getDatabase();
    set(ref(db, 'profiles/' + userId), {
      firstname: values.firstname,
      lastname: values.lastname,
      username: values.username,
      email: values.email,
    });
  }

  const register = () => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        writeUserData(user.uid).then(res => console.log(res));
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
  };
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
      <Paper elevation={0} >
      <Typography variant="h3" gutterBottom component="div">
        Register
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        Register now and get exclusive conent.
      </Typography>
      <TextField 
        id="firstname" 
        label="First Name" 
        variant="outlined" 
        margin="dense" 
        fullWidth
        onChange={handleChange('firstname')}
        />
        <TextField 
        id="lastname" 
        label="Lastname" 
        variant="outlined" 
        margin="dense" 
        fullWidth
        onChange={handleChange('lastname')}
        />
        <TextField 
        id="email" 
        label="Email" 
        variant="outlined" 
        margin="dense" 
        fullWidth
        onChange={handleChange('email')}
        />
      <TextField 
        id="username" 
        label="Username" 
        variant="outlined" 
        margin="dense" 
        fullWidth
        onChange={handleChange('username')}
        />
      <FormControl variant="outlined" 
        fullWidth margin="dense" >
          <InputLabel htmlFor="password">Password</InputLabel>
      <OutlinedInput id="password" 
        label="Password" 
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }/>
      </FormControl>
      
      <Stack spacing={2} direction="row" sx={{
          py: 2
        }}>
          {values.loading ? <LoadingButton loading variant="contained">
        Submit
      </LoadingButton> : <Button variant="contained" onClick={register}>Register</Button>}
      
      <Link href="/auth" passHref><Button variant="text">Already have account? Login</Button></Link>
    </Stack>
      </Paper>
    </Box>
      </Container>
    </div>
  );
}
