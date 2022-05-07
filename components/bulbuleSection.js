import React, { useEffect } from "react";
import Link from "next/link";
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
import Dialog from "@mui/material/Dialog";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IndexAppbar from "../components/indexAppbar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PaidIcon from "@mui/icons-material/Paid";
import Slide from "@mui/material/Slide";

import { AppBar, IconButton, Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player";

import fb from "../firebase/clientApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import SubscribeBtn from "../components/subscribeBtn";

const db = getFirestore();
const auth = getAuth(fb);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BulbuleSection() {
  const [movie, setMovie] = React.useState([]);
  const [subs, setSubs] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const mid = "dpNVfXcGBI3pEhxkggdh";
  const [user] = useAuthState(auth);

  const getSubs = async (user, mid) => {
    if (auth.currentUser) {
      const q = query(
        collection(db, "subscriptions"),
        where("user", "==", user.uid),
        where("movie", "==", mid),
        where("paymentStatus", "==", "success"),
        orderBy("created", "desc")
      );
      const docSnap = await getDocs(q).then((res) => {
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
      getSubs(auth.currentUser, mid);
    }
  }, [user]);

  useEffect(async () => {
    const res = await getDoc(doc(db, "movies", mid));
    const movie = JSON.parse(JSON.stringify(res.data()));
    setMovie(movie);
  }, []);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  var now = Timestamp.now().toDate();

  var isSubs = () => {
    if (!subs) {
      return false;
    }
    var subsCreated = subs[0]?.created.toDate();

    var timePassed = Math.floor((now - subsCreated) / 1000 / 60 / 60); //in hours
    var timeLeft = 24 - timePassed;
    console.log("time left", subsCreated, now, timePassed, timeLeft);
    if (timeLeft >= 0.1) {
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
      <Box>
        <Grid
          container
          sx={{
            color: "#c4c4c5",
            minHeight: { md: "350px", xs: "200px" },
            background:
              "linear-gradient(to bottom, rgba(8,7,14,0) 0%, #08070e 100%), url('https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/bulbule.png?alt=media&token=3f9f5a26-2f0a-4e8a-a762-72516be92485')",
            backgroundSize: "cover",
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3} sx={{ textAlign: "center" }}>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={handleClickOpen}
            >
              <PlayCircleOutlineIcon sx={{ color: "#fff", fontSize: 100 }} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ px: 5 }}>
          <Grid item md={3} sx={{ display: { md: "block", xs: "none" } }}>
            <Paper sx={{ p: 2, background: "#1e1d26", color: "#fff" }}>
              <Typography variant="h6" component="div">
                Release Date
              </Typography>
              <Typography variant="body1" component="div">
                May 5, 2022
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={9}>
            <Box>
              <Typography variant="h3" component="div">
                Bulbule
              </Typography>
              <Typography variant="body1" gutterBottom component="div">
                Two friends, Harmeet and Irfan, from two different minority
                communities in India, meet after a gap of 5 years. What begins
                as a conversation amongst two friends catching up on old times,
                soon becomes an intricate and profound conversation about all
                the fault lines of modern Indian society as they examine all the
                things in our society designed to divide.
              </Typography>
              <Stack direction="row" spacing={2} sx={{ py: 2 }}>
                {user && isSubs() && (
                  <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                    <Button variant="outlined">Subscribed</Button>{" "}
                    {isSubs() && (
                      <Button variant="text">
                        {subsTimeLeft()} hours left
                      </Button>
                    )}
                  </Stack>
                )}
                {user && !isSubs() && (
                  <Box sx={{ mb: 2 }}>
                    <SubscribeBtn movie={movie} mid={mid} />
                  </Box>
                )}
                {!user && (
                  <Link href="/auth" passHref>
                    <Button variant="contained" sx={{ mb: 2 }}>
                      Login To Subscribe
                    </Button>
                  </Link>
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Watch Trailer
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <video autoPlay controls>
          <source
            src="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/Bulbule%20Trailor%20OPT%2002.mp4?alt=media&token=82a25e07-fbd2-4bee-aa82-3560aa85a4b0"
            type="video/mp4"
          />
          Your Browser does not support HTML video.
        </video>
      </Dialog>
    </div>
  );
}
