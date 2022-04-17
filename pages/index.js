import Head from "next/head";
import styles from "../styles/Home.module.css";
import HomeLayout from "../layouts/homeLayout";
import RecommendedVideoSection from "../components/recommendedVideoSection";
import InvestCta from "../components/investCta";
import IndexMovieCover from "../components/indexMovieCover";
import IndexSlideshow from "../components/indexSlideshow";
import AboutSection from "../components/aboutSection";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Indictos</title>
        <meta name="description" content="Watch Bulbule online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout>
        <RecommendedVideoSection />
        <AboutSection />
      </HomeLayout>
    </div>
  );
}
