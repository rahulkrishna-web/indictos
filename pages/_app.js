import '../styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#01506b",
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>
}

export default MyApp
