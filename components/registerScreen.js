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
import Alert from "@mui/material/Alert";
import fb from "../firebase/clientApp";
import LinearProgress from "@mui/material/LinearProgress";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string()
      .required("Mobile No. is required")
      .matches(/^^((\+91)?|91)?[789][0-9]{9}$/, "Mobile number must be valid"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const signup = () => {
    setValues({
      ...values,
      loading: true,
    });
    // find out if email is already registered
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile({
          displayName: values.name,
        });
        console.log(user);
        setValues({
          ...values,
          loading: false,
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setValues({
          ...values,
          loading: false,
          error: error.code,
        });
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
              {values.error && values.error === "auth/email-already-in-use" && (
                <Alert severity="error">
                  Email already exists. Please try signing in.
                </Alert>
              )}
              <TextField
                {...register("name")}
                id="name"
                label="Name"
                variant="outlined"
                margin="dense"
                fullWidth
                onChange={handleChange("name")}
                error={errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                {...register("email")}
                id="email"
                label="Email"
                variant="outlined"
                margin="dense"
                fullWidth
                onChange={handleChange("email")}
                error={errors.email}
                helperText={errors.email?.message}
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
                  <Button
                    variant="contained"
                    onClick={signup}
                    disabled={!values.email || !values.name}
                  >
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
