import React, { useEffect } from 'react';
import Link from 'next/link';
import { getFirestore, collection, doc, getDoc } from "firebase/firestore"
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IndexAppbar from '../components/indexAppbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PaidIcon from '@mui/icons-material/Paid';


export default function BulbuleSection() {
  
  return (
    <div>
      <Box>
      <Paper elevation={0}>
            <img alt="bulbule movie poster" src="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/bulbule.png?alt=media&token=3f9f5a26-2f0a-4e8a-a762-72516be92485" />
        </Paper>
        <Box sx={{p: 2}}>
        <Typography variant="h3" component="div">
        Bulbule
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
      Money leads to everything and everything leads
to money. As people are emotionally charged in
the times of riots, some people make money out
of fear and greed of the people irrespective of
their ideological leanings.
      </Typography>
      <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<PlayCircleOutlineIcon />}>
        Watch Trailer
      </Button>
      <Button variant="contained" endIcon={<PaidIcon />}>
        Invest
      </Button>
    </Stack>
        </Box>
      </Box>
    </div>
  );
}