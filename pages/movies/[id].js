import { Typography, Box, Button } from '@mui/material';
import Head from 'next/head'
import Link from 'next/link';
import ReactPlayer from 'react-player'
import Grid from '@mui/material/Grid';

import HomeLayout from '../../layouts/homeLayout'
import fb from '../../firebase/clientApp';
import { getFirestore, collection, onSnapshot,query, orderBy, QuerySnapshot, getDocs , doc, getDoc } from "firebase/firestore";
import SubscribeBtn from '../../components/subscribeBtn';

const db = getFirestore();

export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db, 'movies'));

    // map data to an array of path objects with params (id)
    const paths = snapshot.docs.map(doc => {
        return {
        params: { id: doc.id.toString() }
        }
        })
  
    return {
      paths,
      fallback: false
    }
  }

  export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await getDoc(doc(db, 'movies', id))
    const movie = JSON.parse(JSON.stringify(res.data())) ;
    return {
      props: { movie, mid: id }
    }
  }

export default function Movie({movie,mid }) {
    console.log("props", movie, mid)
    return (
        <div>
            <HomeLayout>
            <Box sx={{p: 2}}>
            {movie.poster && (
                <img alt={movie.title} src={movie.poster} />
            )}
            <Typography variant="h1" component="div" gutterBottom>
            {movie.title}
            </Typography> 
            {movie.storyline && (
          <Typography variant="subtitle1" gutterBottom component="div">
          {movie.storyline}
          </Typography>)}
          <SubscribeBtn movie={movie} mid={mid}/>

            </Box>
      
            </HomeLayout>
        </div>
    );
}