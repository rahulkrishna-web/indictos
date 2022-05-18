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
  const [openMovie, setOpenMovie] = React.useState(false);
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

  useEffect(() => {
    async function getMovie() {
      const res = await getDoc(doc(db, "movies", mid));
      const movie = JSON.parse(JSON.stringify(res.data()));
      setMovie(movie);
    }
    getMovie();
  }, []);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  function handleClickOpenMovie() {
    setOpenMovie(true);
  }

  const handleCloseMovie = () => {
    setOpenMovie(false);
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
      <img
        onClick={handleClickOpen}
        style={{ width: "100%" }}
        src="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/bulbule-poster-sm.png?alt=media&token=b0849ab3-82e3-4d35-b6e2-ff8803bbb3c4"
      />
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ py: 3 }}>
          <Grid item md={3} sx={{ display: { md: "block", xs: "none" } }}>
            <img
              style={{ width: "100%" }}
              src="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/bulbule_poster.jpg?alt=media&token=236ad0a3-f3aa-4452-ac75-3ebe7cc830c4"
            />
            <Paper sx={{ p: 2, mt: 2, background: "#1e1d26", color: "#fff" }}>
              <Typography variant="h6" component="div">
                Release Date
              </Typography>
              <Typography variant="body1" component="div">
                May 5, 2022
              </Typography>
            </Paper>
            <Typography variant="h6" component="div" sx={{ mt: 2 }}>
              Upcoming
            </Typography>
            <img
              style={{ width: "100%" }}
              src="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/mandi_poster.jpg?alt=media&token=22d8d39c-0c1a-4fe6-af63-67ee7d495e01"
            />
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
                    <Button
                      variant="contained"
                      startIcon={<PlayCircleOutlineIcon />}
                      onClick={handleClickOpenMovie}
                    >
                      Watch Now
                    </Button>{" "}
                    {isSubs() && (
                      <Button variant="text" sx={{ color: "#c4c4c5" }}>
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
                    <Button
                      variant="contained"
                      sx={{ mb: 2 }}
                      startIcon={<PlayCircleOutlineIcon />}
                    >
                      Watch Now
                    </Button>
                  </Link>
                )}
              </Stack>
              <Paper
                elevation={0}
                sx={{ mb: 2, background: "#1e1d26", color: "#c4c4c5" }}
              >
                <Box sx={{ p: 1 }}>
                  <Typography variant="h5" gutterBottom component="div">
                    Movie Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item md={4}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        Duration of the film
                      </Typography>
                      <Typography variant="body2" gutterBottom component="div">
                        95 minutes
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        Director
                      </Typography>
                      <Typography variant="body2" gutterBottom component="div">
                        Manpreet Singh Dhami
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        Produced by
                      </Typography>
                      <Typography variant="body2" gutterBottom component="div">
                        MD Production
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
              <Paper
                elevation={0}
                sx={{ mb: 2, background: "#1e1d26", color: "#c4c4c5" }}
              >
                <Box sx={{ p: 1 }}>
                  <Typography variant="h5" gutterBottom component="div">
                    Movie Cast
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item md={4}>
                      <Typography variant="body2" gutterBottom component="div">
                        Jasmeet Bhatia
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <Typography variant="body2" gutterBottom component="div">
                        Sachin K. Jaryal
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <Typography variant="body2" gutterBottom component="div">
                        Yashodhan Bal
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <Typography variant="body2" gutterBottom component="div">
                        Shabi Jafri
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
              <Paper
                elevation={0}
                sx={{ mb: 2, background: "#1e1d26", color: "#c4c4c5" }}
              >
                <Box sx={{ p: 1 }}>
                  <Typography variant="h5" gutterBottom component="div">
                    Awards
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item md={4}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        UK Asian film festival, London
                      </Typography>
                      <Typography variant="body2" gutterBottom component="div">
                        Nominated
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        Lift-off festival
                      </Typography>
                      <Typography variant="body2" gutterBottom component="div">
                        Selected
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        LIFFT India Filmotsav
                      </Typography>
                      <Typography variant="body2" gutterBottom component="div">
                        Nominated
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        Golden jury international film festival
                      </Typography>
                      <Typography variant="body2" gutterBottom component="div">
                        Selected
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        South Asian International film festival, New York
                      </Typography>
                      <Typography variant="body2" gutterBottom component="div">
                        Nominated
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        First time filmmaker session
                      </Typography>
                      <Typography variant="body2" gutterBottom component="div">
                        Selected
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        Indo global international film festival
                      </Typography>
                      <Typography variant="body2" gutterBottom component="div">
                        Best director award
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        Paris Film festival
                      </Typography>
                      <Typography variant="body2" gutterBottom component="div">
                        Nominated
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        Sincine film festival
                      </Typography>
                      <Typography variant="body2" gutterBottom component="div">
                        Selected
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        Diorama film festival
                      </Typography>
                      <Typography variant="body2" gutterBottom component="div">
                        Best Debut award
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
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
        <video
          autoPlay
          controls
          onContextMenu={(e) => {
            e.preventDefault();
            return false;
          }}
          controlsList="nodownload"
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/Bulbule%20Trailor%20OPT%2002.mp4?alt=media&token=82a25e07-fbd2-4bee-aa82-3560aa85a4b0"
            type="video/mp4"
          />
          Your Browser does not support HTML video.
        </video>
      </Dialog>
      <Dialog
        fullScreen
        open={openMovie}
        onClose={handleCloseMovie}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Watch Movie
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseMovie}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <video
          autoPlay
          controls
          onContextMenu={(e) => {
            e.preventDefault();
            return false;
          }}
          controlsList="nodownload"
        >
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
