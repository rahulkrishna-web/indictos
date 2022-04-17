import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Paper } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import ReactPlayer from "react-player";
import Grid from "@mui/material/Grid";

import HomeLayout from "../../layouts/homeLayout";
import fb from "../../firebase/clientApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

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
  where,
} from "firebase/firestore";
import SubscribeBtn from "../../components/subscribeBtn";
import YouTube from "react-youtube";

const db = getFirestore();
const auth = getAuth(fb);
export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, "movies"));

  // map data to an array of path objects with params (id)
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await getDoc(doc(db, "movies", id));
  const movie = JSON.parse(JSON.stringify(res.data()));
  return {
    props: { movie, mid: id },
  };
};

export default function Movie({ movie, mid }) {
  const [subs, setSubs] = useState([]);
  const opts = {
    width: "100%",
    height: "400",
    modestbranding: 1,
  };
  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  console.log("props", subs);

  const [user] = useAuthState(auth);

  const isSubscribed = async (movie, user, mid) => {
    if (auth.currentUser) {
      const q = query(
        collection(db, "subscriptions"),
        where("user", "==", user.uid),
        where("movie", "==", mid),
        where("paymentStatus", "==", "success")
      );
      const docSnap = await getDocs(q);
      console.log("docsnap", docSnap);
      setSubs(docSnap.docs);
      docSnap.forEach((doc) => {
        console.log(doc.data());
      });
    }

    return false;
  };
  useEffect(() => {
    if (auth.currentUser) {
      isSubscribed(movie, auth.currentUser, mid);
    }
  }, []);

  return (
    <div>
      <HomeLayout>
        {user ? (
          subs.length > 0 ? (
            <Paper elevation={0}>
              <YouTube
                videoId="SsOy4XoDlS0"
                opts={opts}
                onReady={_onReady}
                containerClassName={"youtubeContainer"}
              />
            </Paper>
          ) : (
            movie.poster && <img alt={movie.title} src={movie.poster} />
          )
        ) : (
          movie.poster && <img alt={movie.title} src={movie.poster} />
        )}
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" component="div" gutterBottom>
            {movie.title}
          </Typography>
          {movie.storyline && (
            <Typography variant="subtitle1" gutterBottom component="div">
              {movie.storyline}
            </Typography>
          )}

          {user ? (
            subs.length > 0 ? (
              <Button variant="outlined">Subscribed</Button>
            ) : (
              <SubscribeBtn movie={movie} mid={mid} />
            )
          ) : (
            <Link href="/auth" passHref>
              <Button variant="contained">Login To Subscribe</Button>
            </Link>
          )}
        </Box>
      </HomeLayout>
    </div>
  );
}
