import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import fb from '../firebase/clientApp';


export default function IndexAppbar() {
  const auth = getAuth(fb)
  const [user, loading, error] = useAuthState(auth);
  const logout = () => {
    signOut(auth)
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Indictos
          </Typography>
          {user ? `Hi ${user.email}`: "Hello Guest" }
          {user ?       <Button onClick={logout} variant="outlined" sx={{ color: "#fff"}}>Logout</Button>
: <Link href="/auth" passHref><Button color="inherit">Login</Button></Link>}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
