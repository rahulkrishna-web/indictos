import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "@mui/material";
import AppbarUserMenu from "./appbarUserMenu";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const IndexAppbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Link href="/" sx={{ textDecoration: "none" }} passHref>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Indictos
            </Typography>
          </Link>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link href="/about" sx={{ textDecoration: "none" }} passhref>
                <MenuItem>
                  <Typography textAlign="center">About</Typography>
                </MenuItem>
              </Link>
              <Link
                href="/subscriptions"
                sx={{ textDecoration: "none" }}
                passHref
              >
                <MenuItem>
                  <Typography textAlign="center">Subscriptions</Typography>
                </MenuItem>
              </Link>
              <Link href="/contact" sx={{ textDecoration: "none" }} passhref>
                <MenuItem>
                  <Typography textAlign="center">Contact</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <Link
            href="/"
            sx={{
              textDecoration: "none",
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
            passHref
          >
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,

                fontWeight: 700,
                textDecoration: "none",
                color: "#fff",
              }}
            >
              Indictos
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link
              href="/about"
              sx={{ color: "#fff", textDecoration: "none" }}
              passHref
            >
              <MenuItem>
                <Typography textAlign="center">About</Typography>
              </MenuItem>
            </Link>
            <Link
              href="/subscriptions"
              sx={{ color: "#fff", textDecoration: "none" }}
              passHref
            >
              <MenuItem>
                <Typography textAlign="center">Subscriptions</Typography>
              </MenuItem>
            </Link>
            <Link
              href="/contact"
              sx={{ color: "#fff", textDecoration: "none" }}
              passHref
            >
              <MenuItem>
                <Typography textAlign="center">Contact</Typography>
              </MenuItem>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <AppbarUserMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default IndexAppbar;
