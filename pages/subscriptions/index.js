import React, { useState, useEffect } from "react";

import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Box from "@mui/material/Box";
import IndexAppbar from "../../components/indexAppbar";
import IndexLeadPanel from "../../components/indexLeadPanel";
import HomeScreen from "../../components/homeScreen";
import HomeLayout from "../../layouts/homeLayout";
import { Container, Grid, Paper, Typography } from "@mui/material";
import fb from "../../firebase/clientApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  QuerySnapshot,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import moment from "moment";
import { Grid3x3Sharp } from "@mui/icons-material";
import PlainLayout from "../../layouts/plainLayout";
const auth = getAuth(fb);
const db = getFirestore();

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      const subscriptionsRef = collection(db, "subscriptions");
      const q = query(
        subscriptionsRef,
        where("user", "==", auth.currentUser.uid),
        where("paymentStatus", "==", "success"),
        orderBy("created", "desc")
      );
      const getSubscriptions = onSnapshot(q, (QuerySnapshot) => {
        setSubscriptions(
          QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return getSubscriptions;
    }
    console.log("subs", subscriptions);
  }, []);

  const subscriptionStatus = (s) => {
    var now = new moment();
    var duration = moment.duration(now.diff(s));
    console.log(duration.asDays());
    if (duration < 24) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Subscriptions</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PlainLayout>
        <Container maxWidth="md" sx={{ py: 3 }}>
          {subscriptions.length == 0 && (
            <>
              <Typography variant="h6" gutterBottom>
                The movie &apos;Bulbule&apos; can be watched by paying Rs 99
                through the payment gateway.
              </Typography>
              <Typography variant="body1">
                You didn&apos;t subscribe yet! Please subscribe and start your
                journey with us.
              </Typography>
            </>
          )}

          {auth.currentUser && (
            <>
              <Box sx={{ py: 3 }}>
                <Typography variant="h3" gutterBottom>
                  Subscriptions
                </Typography>
                {subscriptions && (
                  <Grid container spacing={2}>
                    {subscriptions.map((m, index) => (
                      <Grid item key={index} md={3}>
                        <Paper sx={{ p: 2, mb: 2 }}>
                          <Typography variant="h6">{m.movieTitle}</Typography>
                          {moment(m.created.toDate(), "YYYYMMDD").fromNow()} •
                          {subscriptionStatus(m.created.toDate())
                            ? " Active"
                            : " Expired"}
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </>
          )}
        </Container>
      </PlainLayout>
    </div>
  );
}
