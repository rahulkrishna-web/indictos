import Head from 'next/head'
import styles from '../styles/Home.module.css'
import IndexAppbar from '../components/indexAppbar'
import IndexLeadPanel from '../components/indexLeadPanel'
import HomeScreen from '../components/homeScreen'
import HomeLayout from '../layouts/homeLayout'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Indictos</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout>
        Hello
      </HomeLayout>
    </div>
  )
}
