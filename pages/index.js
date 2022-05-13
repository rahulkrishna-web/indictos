import Head from "next/head";
import styles from "../styles/Home.module.css";
import HomeLayout from "../layouts/homeLayout";
import RecommendedVideoSection from "../components/recommendedVideoSection";
import InvestCta from "../components/investCta";
import IndexMovieCover from "../components/indexMovieCover";
import IndexSlideshow from "../components/indexSlideshow";
import AboutSection from "../components/aboutSection";
import BulbuleSection from "../components/bulbuleSection";
import IndexAppbar from "../components/indexAppbar";
import Footer from "../components/footer";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <div
      className={styles.container}
      sx={{ background: "#08070e", color: "#c4c4c5" }}
    >
      <Head>
        <title>Indictos</title>
        <meta name="description" content="Watch Bulbule online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IndexAppbar />
      <Box sx={{ pt: 6 }}>
        <BulbuleSection />
      </Box>

      <Footer />
    </div>
  );
}
