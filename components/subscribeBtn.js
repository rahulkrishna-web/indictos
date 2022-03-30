import * as React from 'react';
import { AppBar, Box, Button, Dialog, IconButton, TextField, Toolbar, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

const SubscribeBtn = ({movie}) => {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return(
        <>
        <Button variant="contained" onClick={handleClickOpen}>Subscribe</Button>
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <AppBar sx={{ position: 'fixed' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Subscribe
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Proceed to Pay
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{p: 2, mt: 10}}>
        Subscribe to {movie.title}
        <TextField id="name" label="Name" variant="outlined" fullWidth margin="dense"/>
        <TextField id="email" label="Email" variant="outlined" fullWidth margin="dense"/>
        <TextField id="mobile" label="Mobile" variant="outlined" fullWidth margin="dense"/>
        <TextField id="address1" label="Address Line 1" variant="outlined" fullWidth margin="dense"/>
        <TextField id="address2" label="Address Line 2" variant="outlined" fullWidth margin="dense"/>
        <TextField id="city" label="City" variant="outlined" fullWidth margin="dense"/>
        <TextField id="state" label="State" variant="outlined" fullWidth margin="dense"/>
        <TextField id="country" label="Country" variant="outlined" fullWidth margin="dense"/>
        <TextField id="pincode" label="Pincode" variant="outlined" fullWidth margin="dense"/>
        </Box>
      </Dialog>
        </>
        
    )
}

export default SubscribeBtn