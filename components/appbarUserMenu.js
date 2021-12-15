import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Link from 'next/link';
import fb from '../firebase/clientApp';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';


const AppbarUserMenu = () => {
    const auth = getAuth(fb);
    const [user] = useAuthState(auth);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const handleMenuGuest = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleMenu = (event) => {
        setAnchorEl2(event.currentTarget);
      };
    const handleCloseGuest = () => {
    setAnchorEl(null);
    };
    const handleClose = () => {
        setAnchorEl2(null);
        };
        const logout = () => {
            signOut(auth)
          };
    return (
    <div>
        {!user && (
        <div>
            <Link href="/auth" passHref>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            </Link>
        </div>
        )}
        {user && (
            <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorEl2}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl2)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={logout}>Sign Out</MenuItem>
          </Menu>
          </div>
            )}
        
    </div>
    )
}

export default AppbarUserMenu