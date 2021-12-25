import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from 'next/link';



export default function RecommendedVideoSection() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Box sx={{ p: 2 }} >
          <Grid container spacing={2}>
              <Grid item md={3}>
                <Link href="/watch/1" passHref>
                  <Card sx={{ maxWidth: 345, cursor: "pointer" }} variant="outlined">
                    <CardMedia
                      component="img"
                      image="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/bulbule_poster.jpg?alt=media&token=236ad0a3-f3aa-4452-ac75-3ebe7cc830c4"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography variant="subtitle2" component="div">
                          Bulbule
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                          IMDB rating : 9.5
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
          </Grid>
        </Box>
    </React.Fragment>
  );
}
