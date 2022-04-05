import { Typography, Box, Button } from '@mui/material';
import Head from 'next/head'
import Link from 'next/link';
import ReactPlayer from 'react-player'
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';

import HomeLayout from '../../layouts/homeLayout'
import fb from '../../firebase/clientApp';
import { getFirestore, collection, onSnapshot,query, orderBy, QuerySnapshot, getDocs , doc, getDoc } from "firebase/firestore";
import SubscribeBtn from '../../components/subscribeBtn';
import { sha512 } from 'js-sha512';
const db = getFirestore();

const payu = {
    merchantKey: process.env.NEXT_PUBLIC_PAYU_MERCHANT_KEY,
    salt1: process.env.NEXT_PUBLIC_PAYU_SALT1,
    salt2:process.env.NEXT_PUBLIC_PAYU_SALT2,
    endpoint:process.env.NEXT_PUBLIC_PAYU_ENDPOINT
  }
   

export default function Subscription({subscription,sid }) {
    const router = useRouter();
     

    console.log("props", subscription, sid)
    const paymentHashString = payu.merchantKey+ "|" + sid + "|" + "99" + "|" + "bulbule" + "|" + subscription.billingAddress.first_name + "|" + subscription.billingAddress.email + "|||||||||||" + payu.salt1
    const paymentHash = sha512(paymentHashString);
    return (
        <div>
            <HomeLayout>
            <Box sx={{p: 2}}>
            Subscription {sid}<br/>
            payment hash string = {paymentHashString}<br/>
            payment hash = {paymentHash}
            router path = {router.pathname}
            <form action='https://test.payu.in/_payment' method='post'>
            <input type="hidden" name="key" value={payu.merchantKey} />
            <input type="hidden" name="txnid" value={sid} />
            <input type="hidden" name="productinfo" value="bulbule" />
            <input type="hidden" name="amount" value="99" />
            <input type="hidden" name="email" value={subscription.billingAddress.email} />
            <input type="hidden" name="firstname" value={subscription.billingAddress.first_name} />
            <input type="hidden" name="lastname" value={subscription.billingAddress.last_name} />
            <input type="hidden" name="surl" value={router.pathname} />
            <input type="hidden" name="furl" value={router.pathname} />
            <input type="hidden" name="phone" value={subscription.billingAddress.mobile} />
            <input type="hidden" name="hash" value={paymentHash} />
            <input type="submit" value="submit" /> 
            </form>
            </Box>
      
            </HomeLayout>
        </div>
    );
}

export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, 'subscriptions'));

  // map data to an array of path objects with params (id)
  const paths = snapshot.docs.map(doc => {
      return {
      params: { id: doc.id.toString() }
      }
      })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await getDoc(doc(db, 'subscriptions', id))
  const subscription = JSON.parse(JSON.stringify(res.data())) ;
  return {
    props: { subscription, sid: id },
    revalidate: 1,
  }
}