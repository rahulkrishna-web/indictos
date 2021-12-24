import * as React from 'react';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import fb from '../firebase/clientApp';

const auth = getAuth(fb)
const provider = new GoogleAuthProvider();


export default function SignInScreen() {
  const [values, setValues] = React.useState({
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

  const login = () => {
    signInWithEmailAndPassword(auth, values.username, values.password);
  };

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(email,credential);
    // ...
  });
  }
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
        Sign In
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        Signing in gives you a lot of extra features.
      </Typography>
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
      </LoadingButton> : <Button variant="contained" onClick={login}>Sign In</Button>}
      
      <Link href="/register" passHref><Button variant="text">No Account? Register</Button></Link>
    </Stack>
    <Button variant="contained" onClick={googleSignIn}startIcon={<GoogleIcon />} >Sign In with Google</Button>
      </Paper>
    </Box>
      </Container>
    </div>
  );
}
