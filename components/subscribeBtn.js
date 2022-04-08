import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import fb from "../firebase/clientApp";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  serverTimestamp,
  FieldValue,
  query,
  where,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { sha512 } from "js-sha512";

const auth = getAuth(fb);
const db = getFirestore();

const payu = {
  merchantKey: process.env.NEXT_PUBLIC_PAYU_MERCHANT_KEY,
  salt1: process.env.NEXT_PUBLIC_PAYU_SALT1,
  salt2: process.env.NEXT_PUBLIC_PAYU_SALT2,
  endpoint: process.env.NEXT_PUBLIC_PAYU_ENDPOINT,
};
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

const SubscribeBtn = ({ movie, mid }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    txnId: "",
    amt: 99,
    productInfo: "bubule",
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    pincode: "",
    uid: "",
    loading: false,
  });
  console.log(auth.currentUser);
  const user = auth.currentUser;
  const surl = basePath + "/success";
  const furl = basePath + "/failure";
  const paymentHashString =
    payu.merchantKey +
    "|" +
    values.txnId +
    "|" +
    "99" +
    "|" +
    "bulbule" +
    "|" +
    user.displayName +
    "|" +
    user.email +
    "|||||||||||" +
    payu.salt1;
  const paymentHash = sha512(paymentHashString);

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last name is required"),
    mobile: Yup.string()
      .required("Mobile No. is required")
      .matches(/^^((\+91)?|91)?[789][0-9]{9}$/, "Mobile number must be valid"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const subscribe = async () => {
    if (user) {
      console.log("not logged in ");
    } else {
      setValues({
        ...values,
        loading: true,
      });
      const data = {
        billingAddress: {
          first_name: user.displayName,
          last_name: "",
          email: user.email,
          mobile: "",
        },
        user: user.uid,
        movieTitle: movie.title,
        movie: mid,
        subscriptionAmt: 99,
        subscriptionPlan: "wVgG0FInanjQXTIJwpiw",
        created: serverTimestamp(),
        updated: serverTimestamp(),
      };
      try {
        const res = await addDoc(collection(db, "subscriptions"), data);
        console.log("Document written with ID: ", res.id);

        setValues({ ...values, txnId: res.id });
        console.log("setTxnID", values.txnId);
        console.log("hash", paymentHashString, paymentHash);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  function onSubmit(data) {
    // display form data on success
    const subs = subscribe();
    console.log(subs);
    return false;
  }

  return (
    <>
      <Button variant="contained" onClick={subscribe}>
        Subscribe
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: "fixed" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Subscribe
            </Typography>
            <Button type="submit" autoFocus color="inherit">
              Proceed to Pay
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 2, mt: 10 }}>
          <Paper sx={{ p: 2 }}>{movie.title}</Paper>
          {user.displayName} | {user.email} | {values.mobile}
          <TextField
            {...register("mobile")}
            id="mobile"
            label="Mobile"
            variant="outlined"
            fullWidth
            margin="dense"
            value={values.mobile}
            onChange={handleChange("mobile")}
            error={errors.mobile}
            helperText={errors.mobile?.message}
          />
          <form action="https://test.payu.in/_payment" method="post">
            <input type="hidden" name="key" value={payu.merchantKey} />
            <input type="hidden" name="txnid" value={values.txnId} />
            <input type="hidden" name="productinfo" value="bulbule" />
            <input type="hidden" name="amount" value="99" />
            <input type="hidden" name="email" value={user.email} />
            <input type="hidden" name="firstname" value={user.displayName} />
            <input type="hidden" name="lastname" value="" />
            <input type="hidden" name="surl" value={surl} />
            <input type="hidden" name="furl" value={furl} />
            <input type="hidden" name="phone" value={values.mobile} />
            <input type="hidden" name="hash" value={paymentHash} />
            <input type="submit" value="Pay Now" />
            <Button type="submit" autoFocus>
              Proceed to Pay
            </Button>
          </form>
        </Box>
      </Dialog>
    </>
  );
};

export default SubscribeBtn;
