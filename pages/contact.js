import Head from 'next/head'
import styles from '../styles/Home.module.css'
import IndexAppbar from '../components/indexAppbar'
import IndexLeadPanel from '../components/indexLeadPanel'
import HomeScreen from '../components/homeScreen'
import HomeLayout from '../layouts/homeLayout'

export default function Contact() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout>
      Contact
      </HomeLayout>
    </div>
  )
}