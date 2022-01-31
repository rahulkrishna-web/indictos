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
import DownloadIcon from '@mui/icons-material/Download';
import PaidIcon from '@mui/icons-material/Paid';


export default function MandiSection() {
  
  return (
    <div>
      <Box>
      <Paper elevation={0}>
            <img alt="bulbule movie poster" src="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/mandi_poster.jpg?alt=media&token=22d8d39c-0c1a-4fe6-af63-67ee7d495e01" />
        </Paper>
        <Box sx={{p: 2}}>
        <Typography variant="h3" component="div">
        Mandi
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
      Money leads to everything and everything leads
to money. As people are emotionally charged in
the times of riots, some people make money out
of fear and greed of the people irrespective of
their ideological leanings.
      </Typography>
      <Stack direction="row" spacing={2}>
        <Link href="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/Mandi%20without%20budget.pdf?alt=media&token=1eef3f39-06b5-4d72-a066-5642cbd0f5c4"><Button variant="outlined" startIcon={<DownloadIcon />}>
        Presentation
      </Button>
        </Link>
      
      <Button variant="contained" endIcon={<PaidIcon />}>
        Partner with us
      </Button>
    </Stack>
        </Box>
      </Box>
    </div>
  );
}