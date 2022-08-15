import React, { useEffect } from "react";
import Link from "next/link";
import {
  getFirestore,
  collection,
  query,
  doc,
  getDoc,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IndexAppbar from "./indexAppbar";
import fb from "../firebase/clientApp";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";

const db = getFirestore();

export default function AdminPanel() {
  const auth = getAuth(fb);
  const [user] = useAuthState(auth);
  const [role, setRole] = React.useState([]);
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

  const getRole = async (uid) => {
    const q = query(
      collection(db, "userRoles"),
      where("userId", "==", uid),
      orderBy("created", "desc")
    );
    const docSnap = await getDocs(q).then((res) => {
      //
    });
    return docSnap;
  };

  useEffect(() => {
    getRole(user.uid);
    console.log("role", user.uid, role);
  }, [user, role]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    user: Yup.string().required("Name is required"),
    mobile: Yup.string()
      .required("Mobile No. is required")
      .matches(/^^((\+91)?|91)?[789][0-9]{9}$/, "Mobile number must be valid"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { generateAccessCard, handleSubmit, reset, formState } =
    useForm(formOptions);

  const { errors } = formState;

  const generateAc = () => {
    setValues({
      ...values,
      loading: true,
    });
  };

  return (
    <div>
      <Box>
        {role.length !== 0 && (
          <>
            {role[0].role === "admin" && (
              <Paper elevation={0}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5" gutterBottom component="div">
                    Add Access Card
                  </Typography>
                  <TextField
                    {...generateAc("email")}
                    id="email"
                    label="User Email"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    onChange={handleChange("email")}
                    error={errors.user}
                    helperText={errors.user?.message}
                  />
                  <Button
                    variant="contained"
                    onClick={generateAc}
                    disabled={!values.email}
                  >
                    Generate Access Card
                  </Button>
                </Box>
              </Paper>
            )}
          </>
        )}
      </Box>
    </div>
  );
}
