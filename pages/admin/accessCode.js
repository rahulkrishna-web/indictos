import * as React from "react";
import Link from "next/link";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
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
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import fb from "../../firebase/clientApp";
import LinearProgress from "@mui/material/LinearProgress";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Grid } from "@mui/material";
import HomeLayout from "../../layouts/homeLayout";
import PlainLayout from "../../layouts/plainLayout";

const db = getFirestore();

export default function AccessCode() {
  const auth = getAuth(fb);
  const [user, loading, error] = useAuthState(auth);
  const [values, setValues] = React.useState({
    email: "",
    accessCode: "",
    usageHours: "",
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
    usageHours: Yup.string().required("Name is required"),
    accessCode: Yup.string().required("accessCode is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const generateAccessCode = async () => {
    setValues({
      ...values,
      loading: true,
    });
    await setDoc(doc(db, "accessCard", values.accessCode), {
      email: values.email,
      accessCode: values.accessCode,
      usageHours: values.usageHours,
      created: serverTimestamp(),
    }).then((res) => {
      setValues({
        ...values,
        email: "",
        accessCode: "",
        usageHours: "",
        loading: false,
      });
    });
  };
  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <>
        {user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
          <HomeLayout>
            <Container sx={{ py: 5 }}>
              <div>
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={3} lg={3}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      component="div"
                      align="center"
                    >
                      Generate New Access Code
                    </Typography>
                    <Paper elevation={0}>
                      {values.loading && <LinearProgress />}
                      <Box sx={{ p: 2 }}>
                        {values.error && (
                          <Alert severity="error" sx={{ mb: 2 }}>
                            Error: {values.error}
                          </Alert>
                        )}
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
                        <TextField
                          {...register("accessCode")}
                          id="accessCode"
                          label="Access Code"
                          variant="outlined"
                          margin="dense"
                          fullWidth
                          onChange={handleChange("accessCode")}
                          error={errors.accessCode}
                          helperText={errors.accessCode?.message}
                        />
                        <TextField
                          {...register("usageHours")}
                          id="usageHours"
                          label="Usage Hours"
                          variant="outlined"
                          margin="dense"
                          fullWidth
                          onChange={handleChange("usageHours")}
                          error={errors.usageHours}
                          helperText={errors.usageHours?.message}
                        />

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
                              onClick={generateAccessCode}
                              disabled={!values.email || !values.accessCode}
                            >
                              Create new Code
                            </Button>
                          )}
                        </Stack>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </HomeLayout>
        )}
        {user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
          <PlainLayout>
            <Container maxWidth="md" sx={{ py: 5 }}>
              <Typography align="center" variant="h3" gutterBottom>
                403
              </Typography>
              <Box
                sx={{
                  textAlign: "center",
                  justifyItems: "center",
                }}
              >
                Not authorized
              </Box>
            </Container>
          </PlainLayout>
        )}
      </>
    );
  }
  return <div>not auth</div>;
}
