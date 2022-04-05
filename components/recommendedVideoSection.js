import React, {useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import fb from '../firebase/clientApp';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, onSnapshot,query, orderBy, QuerySnapshot } from "firebase/firestore";

const auth = getAuth(fb);
const db = getFirestore();

export default function RecommendedVideoSection() {
  const [movies, setMovies] = useState([]);
    useEffect(()=>{
        const collectionRef = collection(db, 'movies');
        const q = query(collectionRef, orderBy("created", "desc"));
        const getMovies = onSnapshot(q, (QuerySnapshot)=>{
            setMovies(QuerySnapshot.docs.map(doc=> ({...doc.data(), id: doc.id})))
        });
        return getMovies;
    });
  return (
    <React.Fragment>
      <CssBaseline />
        <Box sx={{ p: 2 }} >
        <Grid container spacing={2}>
           {movies && (movies.map(m => (
            <Grid item md={3} key={m.id}>
            <Link href={'/movies/' + m.id} passHref>
              <Card sx={{ maxWidth: 345, cursor: "pointer" }} variant="outlined">
                <CardMedia
                  component="img"
                  image={m.portraitPoster}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography variant="subtitle2" component="div">
                      {m.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                      IMDB rating : {m.imdbRating}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          ))
            
          )}
              
          </Grid>
        </Box>
    </React.Fragment>
  );
}
