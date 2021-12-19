import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from 'next/link';



export default function RecommendedVideoSection() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Box sx={{ pb: 5 }} >
            <Typography variant="h6" component="div">
                Recommended
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
                Discover premium movies and videos.
            </Typography>
            <Grid container spacing={2}>
        <Grid item md={3}>
          <Link href="/watch/1" passHref>
        <Card sx={{ maxWidth: 345 }} variant="outlined">
      <CardMedia
        component="img"
        height="140"
        image="https://i.ytimg.com/vi/ujb2CIWE8zY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDO0Au7JLI3QA5w8romtju99hjpkQ"
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="subtitle2" component="div">
            Why is Radix Sort so Fast? Part 2 Radix Sort
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Creel
        </Typography>
      </CardContent>
    </Card>
    </Link>
        </Grid>
        <Grid item md={3}>
        <Link href="/watch/2" passHref>
        <Card sx={{ maxWidth: 345 }} variant="outlined">
      <CardMedia
        component="img"
        height="140"
        image="https://i.ytimg.com/vi/ujb2CIWE8zY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDO0Au7JLI3QA5w8romtju99hjpkQ"
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="subtitle2" component="div">
            Why is Radix Sort so Fast? Part 2 Radix Sort
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Creel
        </Typography>
      </CardContent>
    </Card>
    </Link>
        </Grid>
        <Grid item md={3}>
        <Card sx={{ maxWidth: 345 }} variant="outlined">
      <CardMedia
        component="img"
        height="140"
        image="https://i.ytimg.com/vi/ujb2CIWE8zY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDO0Au7JLI3QA5w8romtju99hjpkQ"
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="subtitle2" component="div">
            Why is Radix Sort so Fast? Part 2 Radix Sort
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Creel
        </Typography>
      </CardContent>
    </Card>
        </Grid>
        <Grid item md={3}>
        <Card sx={{ maxWidth: 345 }} variant="outlined">
      <CardMedia
        component="img"
        height="140"
        image="https://i.ytimg.com/vi/ujb2CIWE8zY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDO0Au7JLI3QA5w8romtju99hjpkQ"
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="subtitle2" component="div">
            Why is Radix Sort so Fast? Part 2 Radix Sort
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Creel
        </Typography>
      </CardContent>
    </Card>
        </Grid>
      </Grid>
        </Box>
    </React.Fragment>
  );
}
