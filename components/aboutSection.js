import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Button, Paper } from "@mui/material";

export default function AboutSection() {
  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" component="div" gutterBottom>
          About
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          You can’t speak the truth unless you are shown the truth. Right now,
          indictos is made for people to watch &apos;Bulbule&apos;. But in
          future we have different plans for this website if we get good
          response. Be a part of the change as Indictos hopes to change the way
          movie industry works.
        </Typography>
        <Link href="/about" passHref>
          <Button variant="text">Know more</Button>
        </Link>
      </Paper>
    </Box>
  );
}
