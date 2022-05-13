import React, { useEffect } from "react";
import Link from "next/link";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import HomeLayout from "../layouts/homeLayout";
import bodyParser from "body-parser";
import { promisify } from "util";
import { useRouter } from "next/router";
import fb from "../firebase/clientApp";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import PlainLayout from "../layouts/plainLayout";

const getBody = promisify(bodyParser.urlencoded());
const db = getFirestore();
const auth = getAuth(fb);

const updateSubs = async (data) => {
  console.log("update subs called");
  const subscriptionsRef = collection(db, "subscriptions");
  await setDoc(
    doc(subscriptionsRef, data.txnid),
    {
      paymentStatus: data.status,
      paymentMode: data.mode,
      paymentBank: data.bankcode,
      mihpayid: data.mihpayid,
    },
    { merge: true }
  ).then((res) => {
    console.log("subs updated", res);
  });
};

const Success = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (props.data) {
      console.log("data found", props.data);
      // save data
      updateSubs(props.data);
    }
  }, []);

  return (
    <PlainLayout>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Box sx={{ p: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" component="div">
              Subscription Successful
            </Typography>
            {props.data && (
              <>
                <Typography variant="subtitle1" component="div">
                  Txn Id : {props.data.txnid}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  Movie : {props.data.productinfo}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  Status : {props.data.status}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  Method : {props.data.bankcode}
                </Typography>
                <Link href="/" passHref>
                  <Button variant="contained" sx={{ my: 1 }}>
                    Watch Movie
                  </Button>
                </Link>
              </>
            )}
          </Paper>
        </Box>
      </Container>
    </PlainLayout>
  );
};

export async function getServerSideProps({ req, res }) {
  if (req.method === "POST") {
    await getBody(req, res);
  }

  return {
    props: {
      data: req?.body || "",
    }, // will be passed to the page component as props
  };
}

export default Success;
