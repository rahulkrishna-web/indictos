import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#2e0de1",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
  typography: {
    h3: {
      fontFamily: "'Fira Sans Condensed', sans-serif",
    },
    body1: {
      fontFamily: "'Lato', sans-serif",
    },
    button: {
      fontStyle: "italic",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@700&family=Lato&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
