import { Paper, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";

export default function IndexSlideshow() {
  var settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    infinite: false,
  };
  return (
    <Slider {...settings}>
      <div>
        <Paper sx={{ p: 2, m: 2 }}>
          <Typography variant="h6" gutterBottom component="div">
            Bulbule
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            Watch for just Rs. 99
          </Typography>
        </Paper>
      </div>
      <div>
        <Paper sx={{ p: 2, m: 2 }}>
          <Typography variant="h6" gutterBottom component="div">
            Great movies
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            Exclusive movies you wont find anywhere
          </Typography>
        </Paper>
      </div>
      <div>
        <Paper sx={{ p: 2, m: 2 }}>
          <Typography variant="h6" gutterBottom component="div">
            Made for you
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            Watch movies, make a difference
          </Typography>
        </Paper>
      </div>
    </Slider>
  );
}
