import * as React from "react";
import Link from "next/link";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
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
import Button from "@mui/material/Button";
import fb from "../firebase/clientApp";
import LinearProgress from "@mui/material/LinearProgress";

const auth = getAuth(fb);
const db = getFirestore();

export default function RegisterScreen() {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
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

  const writeUserData = async (uid) => {
    const data = {
      name: values.name,
      mobile: values.mobile,
      email: values.email,
      username: values.username,
      uid: uid,
      created: serverTimestamp(),
      updated: serverTimestamp(),
    };
    try {
      const docRef = await setDoc(collection(db, "profiles", uid), data);
      console.log("Profile written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const register = () => {
    setValues({
      ...values,
      loading: true,
    });
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        updateProfile(auth.currentUser, {
          displayName: values.name,
          phoneNumber: values.mobile,
          username: values.username,
        });
        writeUserData(user.uid).then((res) => console.log(res));
        setValues({
          ...values,
          loading: false,
        });
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
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 500,
            },
          }}
        >
          <Paper elevation={0}>
            {values.loading && <LinearProgress />}
            <Box sx={{ p: 2 }}>
              <Typography variant="h3" gutterBottom component="div">
                Register
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                Register now and get exclusive conent.
              </Typography>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                margin="dense"
                fullWidth
                onChange={handleChange("name")}
              />
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                margin="dense"
                fullWidth
                onChange={handleChange("username")}
              />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                margin="dense"
                fullWidth
                onChange={handleChange("email")}
              />
              <TextField
                id="mobile"
                label="Mobile"
                variant="outlined"
                margin="dense"
                fullWidth
                onChange={handleChange("mobile")}
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
                  <Button variant="contained" onClick={register}>
                    Register
                  </Button>
                )}

                <Link href="/auth" passHref>
                  <Button variant="text">Already have account? Login</Button>
                </Link>
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}
