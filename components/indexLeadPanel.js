import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function IndexLeadPanel() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: '100vh' }} >
            <Typography variant="h1" component="div" gutterBottom>
                Indictos
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
                Discover premium movies and videos.
            </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}
