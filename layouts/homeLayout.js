import * as React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import PaidIcon from '@mui/icons-material/Paid';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import AppbarUserMenu from '../components/appbarUserMenu';
import Button from '@mui/material/Button';


const drawerWidth = 240;

function HomeLayout(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [desktopOpen, setDesktopOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopToggle = () => {
    setDesktopOpen(!desktopOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
            <Link href="/" passHref>
            <ListItem button key="1">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Bulbule" />
            </ListItem>
            </Link>
            <Link href="/invest" passHref>
            <ListItem button key="3">
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="Invest" />
            </ListItem>
            </Link>
      </List>
      <Divider />
      <List>
      <Link href="/subscriptions" passHref>
        <ListItem button key="1">
            <ListItemIcon>
            <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Subscriptions" />
          </ListItem>
          </Link>
          <Link href="/history" passHref>
          <ListItem button key="2">
            <ListItemIcon>
            <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
          </Link>
      </List>
      <Divider />
      <List>
      <Link href="/about" passHref>
            <ListItem button key="1">
            <ListItemIcon>
            <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          </Link>
          <Link href="/contact" passHref>
          <ListItem button key="2">
            <ListItemIcon>
            <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
          </Link>
      </List>
      <Divider />
      <Box sx={{p : 2}}>
      <Link href="/privacy" passHref><Button variant="text">Privacy</Button></Link>
      <Link href="/terms" passHref><Button variant="text">Terms</Button></Link>
      <Link href="/refund" passHref><Button variant="text">Refund</Button></Link>
      <Link href="/faq" passHref><Button variant="text">FAQ</Button></Link>
      </Box>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            boxShadow: 'none'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDesktopToggle}
            sx={{ mr: 2, display: { xs: 'none', md: 'block' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" passHref >
          <Button variant="text" sx={{ color: "#fff" }}>
            Indictos
          </Button>
          </Link>
          <Box sx={{ flexGrow: "1" }} />
          <AppbarUserMenu />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open={desktopOpen}
          onClose={handleDesktopToggle}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children }
      </Box>
    </Box>
  );
}

HomeLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default HomeLayout;
