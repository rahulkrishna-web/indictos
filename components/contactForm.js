import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';




export default function ContactForm() {
    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      
        <Grid container>
        <Grid item xs={12} md={6}>
            <Paper sx={{p:2}}>
            <Box>
            <Typography variant="h6" component="div" gutterBottom>
                Send a message
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
                Discover premium movies and videos.
            </Typography>
        </Box>
            <TextField  sx={{my:1}} id="name" label="Name" variant="outlined" fullWidth/><br />
            <TextField sx={{my:1}} id="mobile" label="Mobile Number" variant="outlined" fullWidth /><br />
            <TextField sx={{my:1}} id="message" label="Message" variant="outlined" fullWidth />
            <Button onClick={handleClick} variant="contained" endIcon={<SendIcon />}>
       Send Message
      </Button>
            </Paper>
        
        </Grid>
        </Grid>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Message Sent"
        action={action}
      />
    </React.Fragment>
  );
}
