import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Button, Divider, Grid, Paper, Stack } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Box sx={{ py: 2, borderTop: "solid 1px #1e1d26", textAlign: "center" }}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            <Stack spacing={2} direction="row" sx={{ textAlign: "center" }}>
              <Link href="/privacy" passHref>
                <Button variant="text" sx={{ color: "#c4c4c5" }}>
                  Privacy
                </Button>
              </Link>
              <Link href="/terms" passHref>
                <Button variant="text" sx={{ color: "#c4c4c5" }}>
                  Terms
                </Button>
              </Link>
              <Link href="/refund" passHref>
                <Button variant="text" sx={{ color: "#c4c4c5" }}>
                  Refund
                </Button>
              </Link>
              <Link href="/faq" passHref>
                <Button variant="text" sx={{ color: "#c4c4c5" }}>
                  FAQ
                </Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Typography variant="body1" component="div" gutterBottom>
          © 2022, Indictos
        </Typography>
        <script
          id="dsq-count-scr"
          src="//indictos-com.disqus.com/count.js"
          async
        ></script>
      </Box>
    </>
  );
}
