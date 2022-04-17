import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Paper, Stack, Divider } from "@mui/material";
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
  Timestamp,
  toDate,
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
  console.log("props", movie);

  const [user] = useAuthState(auth);

  const getSubs = async (movie, user, mid) => {
    if (auth.currentUser) {
      const q = query(
        collection(db, "subscriptions"),
        where("user", "==", user.uid),
        where("movie", "==", mid),
        where("paymentStatus", "==", "success")
      );
      const docSnap = await getDocs(q).then((res) => {
        console.log("docsnap", res);
        setSubs(
          res.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
      return docSnap;
    }

    return false;
  };
  useEffect(() => {
    if (auth.currentUser) {
      getSubs(movie, auth.currentUser, mid);
    }
  }, [user]);
  var now = Timestamp.now().toDate();

  var isSubs = () => {
    if (!subs) {
      return false;
    }
    var subsCreated = subs[0]?.created.toDate();

    var timePassed = Math.floor((now - subsCreated) / 1000 / 60 / 60); //in hours
    if (timePassed < 48) {
      return true;
    }
    return false;
  };

  var subsTimeLeft = () => {
    if (!subs) {
      return false;
    }
    var subsCreated = subs[0]?.created.toDate();
    var timePassed = Math.floor((now - subsCreated) / 1000 / 60 / 60); //in hours
    var timeLeft = 24 - timePassed;
    if (timeLeft <= 0.1) {
      return 0;
    }
    return timeLeft;
  };

  return (
    <div>
      <HomeLayout>
        {isSubs() && (
          <Paper elevation={0}>
            <YouTube
              videoId="SsOy4XoDlS0"
              opts={opts}
              onReady={_onReady}
              containerClassName={"youtubeContainer"}
            />
          </Paper>
        )}
        {!isSubs() && movie.poster && (
          <img alt={movie.title} src={movie.poster} />
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
          {user && isSubs() && (
            <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
              <Button variant="outlined">Subscribed</Button>{" "}
              {isSubs() && (
                <Button variant="text">{subsTimeLeft()} hours left</Button>
              )}
            </Stack>
          )}
          <Divider />
          <Paper elevation={0}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom component="div">
                Movie Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Duration of the film
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    {movie?.duration ?? "-"}
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Director
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    {movie?.director ?? "-"}
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Produced by
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    {movie?.producer ?? "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
          <Paper elevation={0}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom component="div">
                Movie Cast
              </Typography>
              <Grid container spacing={2}>
                {movie.actors &&
                  movie.actors.map((m, index) => {
                    return (
                      <Grid item md={4} key={index}>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          {m}
                        </Typography>
                      </Grid>
                    );
                  })}
              </Grid>
            </Box>
          </Paper>
          <Paper elevation={0}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom component="div">
                Awards
              </Typography>
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    UK Asian film festival, London
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    Nominated
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Lift-off festival
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    Selected
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    LIFFT India Filmotsav
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    Nominated
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Golden jury international film festival
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    Selected
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    South Asian International film festival, New York
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    Nominated
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    First time filmmaker session
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    Selected
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Indo global international film festival
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    Best director award
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Paris Film festival
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    Nominated
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Sincine film festival
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    Selected
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Diorama film festival
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    Best Debut award
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {user && !isSubs() && <SubscribeBtn movie={movie} mid={mid} />}

          {!user && (
            <Link href="/auth" passHref>
              <Button variant="contained">Login To Subscribe</Button>
            </Link>
          )}

          <Paper>{subs && <div></div>}</Paper>
        </Box>
      </HomeLayout>
    </div>
  );
}
