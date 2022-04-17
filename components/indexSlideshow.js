import { Paper, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";

export default function IndexSlideshow() {
  var settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    infinite: false,
  };
  return (
    <Slider {...settings}>
      <div>
        <Paper sx={{ p: 2, m: 2 }}>
          <Typography variant="h6" gutterBottom component="div">
            1. Heading
          </Typography>
        </Paper>
      </div>
      <div>
        <Paper sx={{ p: 2, m: 2 }}>
          <Typography variant="h6" gutterBottom component="div">
            2. Heading
          </Typography>
        </Paper>
      </div>
      <div>
        <Paper sx={{ p: 2, m: 2 }}>
          <Typography variant="h6" gutterBottom component="div">
            3. Heading
          </Typography>
        </Paper>
      </div>
    </Slider>
  );
}
