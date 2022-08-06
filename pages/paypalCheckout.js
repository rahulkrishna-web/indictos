import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import HomeLayout from "../layouts/homeLayout";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  QuerySnapshot,
  getDocs,
  doc,
  getDoc,
  addDoc,
  where,
  Timestamp,
  serverTimestamp,
  toDate,
} from "firebase/firestore";
import Dialog from "@mui/material/Dialog";
import Router, { useRouter } from "next/router";
import { PayPalButton } from "react-paypal-button-v2";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import PlainLayout from "../layouts/plainLayout";
import fb from "../firebase/clientApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

const db = getFirestore();
const auth = getAuth(fb);

export default function PaypalCheckout() {
  const router = useRouter();
  const mid = "dpNVfXcGBI3pEhxkggdh";
  const [user] = useAuthState(auth);
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
    success: false,
  });
  useEffect(() => {
    setValues({
      ...values,
      firstname: user.displayName,
      email: user.email,
      uid: user.uid,
      mobile: user.mobile,
    });
  }, []);
  const subscribePaypal = async (name, email) => {
    if (!user) {
      console.log("not logged in ");
      router.push("/");
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
        movieTitle: "Bulbule",
        movie: "dpNVfXcGBI3pEhxkggdh",
        subscriptionAmt: 4,
        subscriptionPlan: "wVgG0FInanjQXTIJwpiw",
        paymentStatus: "success",
        created: serverTimestamp(),
        updated: serverTimestamp(),
      };
      try {
        const res = await addDoc(collection(db, "subscriptions"), data);
        console.log("Subscribed: ", res.id);
        setValues({ ...values, txnId: res.id, success: true });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Paypal Checkout</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PlainLayout>
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Box sx={{ p: 2 }}>
            {values.success ? (
              <div>
                <Paper sx={{ p: 2 }}>
                  Your transaction was successful. Please proceed to watch
                  movie.
                  <Link href="/" passHref>
                    <Button variant="contained" sx={{ my: 1 }}>
                      Go to Movie
                    </Button>
                  </Link>
                </Paper>
              </div>
            ) : (
              <div>
                <PayPalButton
                  amount="4"
                  // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                  onSuccess={(details, data) => {
                    console.log("Transaction completed by ", details.payer);
                    subscribePaypal(
                      details.payer.name.given_name,
                      details.payer.email_address
                    );
                  }}
                  options={{
                    clientId:
                      "ASE62TzLRWfwOxPBtZRSCamwICYy5XCwxakWIiQ9C10I1vMcWKUxfGz5QLB1RCNwAtGwMWOJEnLtlxxr",
                  }}
                />
              </div>
            )}
          </Box>
        </Container>
      </PlainLayout>
    </div>
  );
}
