import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
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
  addDoc,
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
import { PayPalButton } from "react-paypal-button-v2";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player/youtube";
import { DiscussionEmbed } from "disqus-react";
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
  const [accessCode, setAccessCode] = React.useState([]);
  const [subs, setSubs] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openMovie, setOpenMovie] = React.useState(false);
  const [country, setCountry] = React.useState("");
  const mid = "dpNVfXcGBI3pEhxkggdh";
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!localStorage.getItem("country")) {
      fetch("https://ipapi.co/json/")
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
        setValues({ ...values, txnId: res.id });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

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
  const getAccessCodes = async (user) => {
    if (auth.currentUser) {
      const q = query(
        collection(db, "accessCard"),
        where("email", "==", user.email),
        orderBy("created", "desc")
      );
      const docSnap = await getDocs(q).then((res) => {
        setAccessCode(
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
      getAccessCodes(auth.currentUser);
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

  var isAccessCode = () => {
    if (!accessCode) {
      return false;
    }
    console.log("ac", accessCode);
    var accessCodeCreated = accessCode[0]?.created.toDate();

    var timePassed = Math.floor((now - accessCodeCreated) / 1000 / 60 / 60); //in hours
    var timeLeft = accessCode[0]?.usageHours - timePassed;
    if (timeLeft >= 0.1) {
      return true;
    }
    return false;
  };

  var isSubs = () => {
    if (!subs) {
      return false;
    }
    console.log("subs", subs);
    var subsCreated = subs[0]?.created.toDate();

    var timePassed = Math.floor((now - subsCreated) / 1000 / 60 / 60); //in hours
    var timeLeft = 24 - timePassed;
    if (timeLeft >= 0.1) {
      return true;
    }
    return false;
  };

  var accessTimeLeft = () => {
    if (!accessCode) {
      return false;
    }
    var accessCodeCreated = accessCode[0]?.created.toDate();
    var timePassed = Math.floor((now - accessCodeCreated) / 1000 / 60 / 60); //in hours
    var timeLeft = accessCode[0]?.usageHours - timePassed;
    if (timeLeft <= 0.1) {
      return 0;
    }
    return timeLeft;
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
        src="https://pipaltree.ngo/wp-content/uploads/0001_A.jpg"
        alt="poster"
      />
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ py: 3 }}>
          <Grid item md={3} sx={{ display: { md: "block", xs: "none" } }}>
            <img
              style={{ width: "100%" }}
              src="https://pipaltree.ngo/wp-content/uploads/0002_A.jpg"
              alt="poster"
            />
            <Paper sx={{ p: 2, mt: 2, background: "#1e1d26", color: "#fff" }}>
              <Typography variant="h6" component="div">
                Release Date
              </Typography>
              <Typography variant="body1" component="div">
                Aug 4, 2022
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={9} sm={12}>
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
              {user && (
                <>
                  {isAccessCode() && (
                    <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<PlayCircleOutlineIcon />}
                        onClick={handleClickOpenMovie}
                      >
                        Watch Movie
                      </Button>{" "}
                      <Button variant="text" sx={{ color: "#c4c4c5" }}>
                        {accessTimeLeft()} hours left
                      </Button>
                      <Link href="https://pmny.in/TIfLKUtbuvJ8">
                        <Button variant="contained" sx={{ mb: 2 }}>
                          Donate Us
                        </Button>
                      </Link>
                    </Stack>
                  )}
                  {isSubs() && (
                    <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<PlayCircleOutlineIcon />}
                        onClick={handleClickOpenMovie}
                      >
                        Watch Moviex
                      </Button>{" "}
                      {isSubs() && (
                        <Button variant="text" sx={{ color: "#c4c4c5" }}>
                          {subsTimeLeft()} hours left
                        </Button>
                      )}
                      <Link href="https://pmny.in/TIfLKUtbuvJ8">
                        <Button variant="contained" sx={{ mb: 2 }}>
                          Donate Us
                        </Button>
                      </Link>
                    </Stack>
                  )}
                </>
              )}

              {user && !isAccessCode() && !isSubs() && (
                <Box sx={{ mb: 2 }}>
                  <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                    {country && country === undefined ? (
                      <SubscribeBtn movie={movie} mid={mid} />
                    ) : (
                      <>
                        {country === "IN" ? (
                          <SubscribeBtn movie={movie} mid={mid} />
                        ) : (
                          <Link href="/paypalCheckout">
                            <Button variant="contained" sx={{ mb: 2 }}>
                              Subscribe - $4
                            </Button>
                          </Link>
                        )}
                      </>
                    )}

                    <Link href="https://pmny.in/TIfLKUtbuvJ8">
                      <Button variant="contained" sx={{ mb: 2 }}>
                        Donate Us
                      </Button>
                    </Link>
                  </Stack>
                </Box>
              )}
              {accessCode.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Access Code Active
                  </Typography>
                </Box>
              )}
              {!user && (
                <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                  <div>
                    <Link href="/auth">
                      <Button
                        variant="contained"
                        sx={{ mb: 2 }}
                        startIcon={<PlayCircleOutlineIcon />}
                      >
                        Watch Movie
                      </Button>
                    </Link>
                  </div>

                  <div>
                    <Link href="https://pmny.in/TIfLKUtbuvJ8">
                      <Button variant="contained" sx={{ mb: 2 }}>
                        Donate Us
                      </Button>
                    </Link>
                  </div>
                </Stack>
              )}

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
                        sx={{ color: "#edcf3e" }}
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
                        sx={{ color: "#edcf3e" }}
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
                        sx={{ color: "#edcf3e" }}
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
                      <Typography
                        variant="body2"
                        gutterBottom
                        component="div"
                        sx={{ color: "#edcf3e" }}
                      >
                        Jasmeet Bhatia
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <Typography
                        variant="body2"
                        gutterBottom
                        component="div"
                        sx={{ color: "#edcf3e" }}
                      >
                        Sachin K. Jaryal
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <Typography
                        variant="body2"
                        gutterBottom
                        component="div"
                        sx={{ color: "#edcf3e" }}
                      >
                        Yashodhan Bal
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <Typography
                        variant="body2"
                        gutterBottom
                        component="div"
                        sx={{ color: "#edcf3e" }}
                      >
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
                        sx={{ color: "#edcf3e" }}
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
                        sx={{ color: "#edcf3e" }}
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
                        sx={{ color: "#edcf3e" }}
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
                        sx={{ color: "#edcf3e" }}
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
                        sx={{ color: "#edcf3e" }}
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
                        sx={{ color: "#edcf3e" }}
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
                        sx={{ color: "#edcf3e" }}
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
                        sx={{ color: "#edcf3e" }}
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
                        sx={{ color: "#edcf3e" }}
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
                        sx={{ color: "#edcf3e" }}
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
              <Typography variant="h5" component="div" sx={{ mt: 4, mb: 2 }}>
                Upcoming Project - BRAINWASHED!
              </Typography>
              <Typography variant="h6" component="div" sx={{ mt: 2, mb: 2 }}>
                Synopsis
              </Typography>
              <Typography variant="body2" gutterBottom component="div">
                A 42-year old motivated father, Namit, is up against the
                powerful education board which is responsible for unaccountable,
                twisted history and brainwashing social science textbooks. Will
                the truth ever see the light of the day, or will printed words
                take the throne as he tries to save his daughter from getting
                brainwashed through the history textbooks?
              </Typography>
              <ReactPlayer
                className="fullwidth"
                url="https://www.youtube.com/watch?v=ILKvE75Yuxs"
              />
              <Typography variant="h6" component="div" sx={{ mt: 2, mb: 2 }}>
                To be a part of our upcoming project
              </Typography>
              <Link href="/contact">
                <Button variant="contained" sx={{ color: "#c4c4c5" }}>
                  Contact Us
                </Button>
              </Link>
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
          poster="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/0001%20(1).jpg?alt=media&token=769f8418-2e96-44ea-a31e-6f46ff44b896"
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
        <Box>
          <DiscussionEmbed
            shortname="indictos-com"
            config={{
              url: "https://www.indictos.com/",
              identifier: "indictos",
              title: "indictos",
            }}
          />
        </Box>
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
        {isMobile ? (
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
              src="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/Bulbule_mobile.mp4?alt=media&token=8297ea68-6a80-41f2-b0ee-f50073411a61"
              type="video/mp4"
            />
            Your Browser does not support HTML video.
          </video>
        ) : (
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
              src="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/Bulbule.mp4?alt=media&token=d5a7fae5-49f1-4b07-b94d-a56aeb3a372c"
              type="video/mp4"
            />
            Your Browser does not support HTML video.
          </video>
        )}

        <DiscussionEmbed
          shortname="indictos-com"
          config={{
            url: "https://www.indictos.com/",
            identifier: "indictos",
            title: "indictos",
          }}
        />
      </Dialog>
    </div>
  );
}
