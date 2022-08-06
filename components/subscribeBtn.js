import React, { useEffect, useState, useMemo } from "react";
import countryList from "react-select-country-list";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { sha512 } from "js-sha512";
import { PayPalButton } from "react-paypal-button-v2";

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
  const auth = getAuth(fb);
  const [user] = useAuthState(auth);
  const [country, setCountry] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const countryChangeHandler = (e) => {
    setCountry(e.target.value);
  };

  useEffect(() => {
    if (!localStorage.getItem("country")) {
      fetch(
        "http://api.ipapi.com/api/check?access_key=177c228a8d318be5cd40dd250f2cb591"
      )
        .then((res) => res.json())
        .then((response) => {
          console.log("Country is : ", response.country_code);
          setCountry(response.country_code);
          localStorage.setItem("country", response.country_code);
        })
        .catch((data, status) => {
          console.log("Request failed:", data);
        });
    } else {
      setCountry(localStorage.getItem("country"));
      console.log("logging from", localStorage.getItem("country"));
    }
  }, []);

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
  useEffect(() => {
    const openDialog = () => {
      if (values.txnId) {
        setOpen(true);
      }
    };
    openDialog();
  }, [values.txnId]);
  useEffect(() => {
    setValues({
      ...values,
      firstname: user.displayName,
      email: user.email,
      uid: user.uid,
      mobile: user.mobile,
    });
  }, []);
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
    values.firstname +
    "|" +
    values.email +
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
    if (!user) {
      console.log("not logged in ");
    } else {
      setValues({
        ...values,
        loading: true,
      });
      const data = {
        billingAddress: {
          first_name: values.firstname,
          last_name: "",
          email: values.email,
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
        console.log("Subscribed: ", res.id);
        setValues({ ...values, txnId: res.id });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const subscribePaypal = async (name, email) => {
    if (!user) {
      console.log("not logged in ");
    } else {
      setValues({
        ...values,
        loading: true,
      });
      const data = {
        billingAddress: {
          first_name: name,
          last_name: "",
          email: email,
          mobile: "",
        },
        user: user.uid,
        movieTitle: movie.title,
        movie: mid,
        subscriptionAmt: 4,
        subscriptionPlan: "wVgG0FInanjQXTIJwpiw",
        created: serverTimestamp(),
        updated: serverTimestamp(),
      };
      try {
        const res = await addDoc(collection(db, "subscriptions"), data);
        console.log("Subscribed: ", res.id);
        setValues({ ...values, txnId: res.id });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <>
      <Button variant="contained" onClick={subscribe}>
        Watch Movie
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: "fixed" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Subscribe
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 2, mt: 10 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            {country && country === "IN"
              ? "Subscription Amount: ₹ 99"
              : "Subscription Amount: $4"}
          </Paper>

          {country && country === "IN" ? (
            <>
              <TextField
                {...register("firstname")}
                id="name"
                label="Name"
                variant="filled"
                fullWidth
                margin="dense"
                value={values.firstname}
                onChange={handleChange("firstname")}
                error={errors.firstname}
                helperText={errors.firstname?.message}
              />
              <TextField
                {...register("email")}
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="dense"
                value={values.email}
                onChange={handleChange("email")}
                error={errors.email}
                helperText={errors.email?.message}
              />
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
              <form
                action={process.env.NEXT_PUBLIC_PAYU_ENDPOINT}
                method="post"
              >
                <input type="hidden" name="key" value={payu.merchantKey} />
                <input type="hidden" name="txnid" value={values.txnId} />
                <input type="hidden" name="productinfo" value="bulbule" />
                <input type="hidden" name="amount" value="99" />
                <input type="hidden" name="email" value={values.email} />
                <input
                  type="hidden"
                  name="firstname"
                  value={values.firstname}
                />
                <input type="hidden" name="lastname" value="" />
                <input type="hidden" name="surl" value={surl} />
                <input type="hidden" name="furl" value={furl} />
                <input type="hidden" name="phone" value={values.mobile} />
                <input type="hidden" name="hash" value={paymentHash} />

                <Button
                  variant="contained"
                  type="submit"
                  autoFocus
                  disabled={
                    !values.mobile || !values.email || !values.firstname
                  }
                  sx={{ mt: 1 }}
                >
                  Pay Now
                </Button>
              </form>
            </>
          ) : (
            <div>
              <PayPalButton
                amount="4"
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                  console.log("Transaction completed by ", details.payer);
                  subscribePaypal(
                    details.payer.name.given_name,
                    details.payer.email
                  );
                }}
              />
            </div>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default SubscribeBtn;
