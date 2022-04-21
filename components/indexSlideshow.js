import { Paper, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";

export default function IndexSlideshow() {
  var settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    arrows: true,
    autoplay: true,
  };
  return (
    <div className="fullwidth">
      <Slider {...settings}>
        <div>
          <Paper sx={{ m: 2 }}>
            <img src="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/slideshow1.png?alt=media&token=a99ae982-1446-486f-97a2-43f87c3e0e18" />
          </Paper>
        </div>
        <div>
          <Paper sx={{ m: 2 }}>
            <img src="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/slideshow3.png?alt=media&token=d17681e4-5ab9-4204-9e5a-ba899a2864a6" />
          </Paper>
        </div>
        <div>
          <Paper sx={{ m: 2 }}>
            <img src="https://firebasestorage.googleapis.com/v0/b/indictos-com.appspot.com/o/slideshow2.png?alt=media&token=4ed9b330-2cdf-4877-bce1-6d0294696d7c" />
          </Paper>
        </div>
      </Slider>
    </div>
  );
}
