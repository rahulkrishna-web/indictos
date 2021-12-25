import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Image from 'next/image'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Grid from '@mui/material/Grid';


export default function IndexMovieCover() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Box >
            <Paper elevation={0}>
            <img alt="bulbule movie poster" src="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/bulbule_wide_poster.jpg?alt=media&token=94b83d31-7a5a-4fd1-9aee-f106dc81c0f6" />
            </Paper>
            <Paper elevation={0}>
              <Box sx={{p:2}}>
              <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<PlayCircleOutlineIcon />}>
        Watch
      </Button>
      <Button variant="contained" endIcon={<FavoriteBorderIcon />}>
        Like
      </Button>
    </Stack>
              </Box>
            </Paper>
            <Paper elevation={0}>
              <Box sx={{p:2}}>
              <Typography variant="h5" gutterBottom component="div">
                Movie Details
              </Typography>
              <Grid container>
                <Grid item md={4}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Duration of the film
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    95 minutes
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Director
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    Manpreet Singh Dhami
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    Produced by
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    MD Production
                  </Typography>
                </Grid>
              </Grid>
              </Box>
            </Paper>
            <Paper elevation={0}>
              <Box sx={{p:2}}>
              <Typography variant="h5" gutterBottom component="div">
                Movie Cast
              </Typography>
              <Grid container>
                <Grid item md={4}>
                  <Typography variant="body2" gutterBottom component="div">
                  Jasmeet Bhatia
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                  Shabi Jafri
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="body2" gutterBottom component="div">
                  Sachin  K. Jaryal
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="body2" gutterBottom component="div">
                  Yashodhan Bal
                  </Typography>
                </Grid>
              </Grid>
              </Box>
            </Paper>
            <Paper elevation={0}>
              <Box sx={{p:2}}>
              <Typography variant="h5" gutterBottom component="div">
                Awards
              </Typography>
              <Grid container>
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
            <Paper elevation={0}>
              <Box sx={{p:2}}>
              <Typography variant="h5" gutterBottom component="div">
                Synopsis
              </Typography>
              <Typography variant="body1" gutterBottom component="div">
              Two friends, Harmeet and Irfan, from two different minority communities in India, meet after a gap of 5 years. What begins as a conversation amongst two friends catching up on old times, soon becomes an intricate and profound conversation about all the fault lines of modern Indian society as they examine all the things in our society designed to divide. From politics, religion, justice, discrimination and beyond, Bulbule offers a poignant snapshot of modern India through the lens of a conversaition between two friends.
              </Typography>
              </Box>
            </Paper>
        </Box>
    </React.Fragment>
  );
}
