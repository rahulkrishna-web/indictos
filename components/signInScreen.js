import * as React from "react";
import Link from "next/link";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IndexAppbar from "../components/indexAppbar";
import Stack from "@mui/material/Stack";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import fb from "../firebase/clientApp";
import { Alert, Grid, LinearProgress } from "@mui/material";

const auth = getAuth(fb);
const provider = new GoogleAuthProvider();

export default function SignInScreen() {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    loading: false,
    showPassword: false,
    error: "",
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
    setValues({
      ...values,
      loading: true,
    });
    signInWithEmailAndPassword(auth, values.username, values.password).catch(
      (error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setValues({
          ...values,
          loading: false,
          error: error.code,
        });
      }
    );
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
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setValues({
          ...values,
          loading: false,
          error: error.code,
        });
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(email, credential);
        // ...
      });
  };
  return (
    <div>
      <IndexAppbar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh", background: "#08070e" }}
      >
        <Grid item xs={3}>
          <Typography variant="h5" gutterBottom component="div" align="center">
            Login
          </Typography>
          <Paper>
            {values.loading && <LinearProgress />}
            {values.error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Error: {values.error}
              </Alert>
            )}
            <Box sx={{ p: 2 }}>
              <Button
                variant="contained"
                onClick={googleSignIn}
                startIcon={<GoogleIcon />}
              >
                Sign In with Google
              </Button>
            </Box>
            <Box sx={{ p: 2 }}>
              <TextField
                id="username"
                label="Email"
                variant="outlined"
                margin="dense"
                fullWidth
                onChange={handleChange("username")}
              />
              <FormControl variant="outlined" fullWidth margin="dense">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  label="Password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Stack
                spacing={2}
                direction="row"
                sx={{
                  py: 2,
                }}
              >
                {values.loading ? (
                  <LoadingButton loading variant="contained">
                    Submit
                  </LoadingButton>
                ) : (
                  <Button variant="contained" onClick={login} align="right">
                    Sign In
                  </Button>
                )}
              </Stack>
            </Box>
          </Paper>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Link href="/register" passHref>
                <Button variant="text" sx={{ my: 2, color: "#c4c4c5" }}>
                  No Account? Register
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
