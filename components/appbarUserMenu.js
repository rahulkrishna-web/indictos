import * as React from "react";
import Router, { useRouter } from "next/router";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import fb from "../firebase/clientApp";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const AppbarUserMenu = () => {
  const router = useRouter();
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
    signOut(auth);
    router.push("/");
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
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl2)}
            onClose={handleClose}
          >
            <Link href="/dashboard" passHref>
              <MenuItem>Dashboard</MenuItem>
            </Link>
            {user.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
              <Link href="/admin" passHref>
                <MenuItem>Admin</MenuItem>
              </Link>
            )}

            <Link href="/profile" passHref>
              <MenuItem>Profile</MenuItem>
            </Link>
            <Link href="/account" passHref>
              <MenuItem>My account</MenuItem>
            </Link>
            <MenuItem onClick={logout}>Sign Out</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default AppbarUserMenu;
