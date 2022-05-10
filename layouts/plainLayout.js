import * as React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IndexAppbar from "../components/indexAppbar";
import Footer from "../components/footer";

const drawerWidth = 240;

function PlainLayout(props) {
  const { window, children } = props;

  return (
    <>
      <IndexAppbar />
      <Box sx={{ minHeight: "80vh", mt: 7 }}>{children}</Box>
      <Footer />
    </>
  );
}

PlainLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default PlainLayout;
