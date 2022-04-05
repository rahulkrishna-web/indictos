import * as React from 'react';
import { useRouter } from 'next/router';
import { AppBar, Box, Button, Dialog, IconButton, TextField, Toolbar, Typography } from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';
import fb from '../firebase/clientApp';
import { getFirestore, collection, doc, setDoc,addDoc,getDocs, serverTimestamp, FieldValue, query, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const auth = getAuth(fb);

const db = getFirestore();



const SubscribeBtn = ({movie,mid}) => {
  const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({
      txnId: '',
      amt: 99,
      productInfo: "bubule",
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      address1: '',
      address2: '',
      city: '',
      country: '',
      pincode: '',
      loading: false
    });

    // form validation rules 
    const validationSchema = Yup.object().shape({
      firstname: Yup.string()
          .required('First Name is required'),
      lastname: Yup.string()
          .required('Last name is required'),
      mobile: Yup.string()
          .required('Mobile No. is required')
          .matches(/^^((\+91)?|91)?[789][0-9]{9}$/, 'Mobile number must be valid'),
      email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
      address1: Yup.string()
          .required('Address1 is required'),
      address2: Yup.string()
          .required('Address2 is required'),
      city: Yup.string()
          .required('City is required'),
      state: Yup.string()
          .required('State is required'),
      country: Yup.string()
          .required('Country is required'),
      pincode: Yup.string()
          .required('Pincode is required')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
    

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(movie,mid)
  
  const paymentData = {
    key:"",
    txnid:"",
    productinfo:"",
    amount:"",
    email:"",
    firstname:"",
    lastname:"",
    surl:"",
    furl:"",
    phone:"",
    hash:""
  }
  const initPayment = async() => {
    console.log("payment init")
    // get settings data from db
    axios.post(payu.endpoint, paymentData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const subscribe = async() => {
    setValues({
        ...values,
        loading: true,
      });
    const data = {
        billingAddress: {
          first_name : values.firstname,
          last_name : values.lastname,
          email : values.email,
          mobile : values.mobile,
          address1: values.address1,
          address2: values.address2,
          city: values.city,
          country: values.country,
          pincode: values.pincode
        },
        user : auth.currentUser.uid,
        movieTitle : movie.title,
        movie: mid,
        subscriptionAmt: 99,
        subscriptionPlan: "wVgG0FInanjQXTIJwpiw",
        created : serverTimestamp(),
        updated: serverTimestamp()
    }
    try {
      const res = await addDoc(collection(db, "subscriptions"), data);
        console.log("Document written with ID: ", res.id);

        setValues({...values,txnId: res.id})
        console.log("setTxnID", values.txnId)
        router.push("/subscriptions/"+res.id)
      const payment = await initPayment(paymentData);
      console.log("hash",paymentHashString,paymentHash)
        setValues({
          firstname: '',
          lastname: '',
          email: '',
          mobile: '',
          address1: '',
          address2: '',
          city: '',
          country: '',
          pincode: '',
          loading: false
        })
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  };
  function onSubmit(data) {
    // display form data on success
    const subs = subscribe();
    console.log(subs);
    return false;
}

    return(
        <>
        <Button variant="contained" onClick={handleClickOpen}>Subscribe</Button>
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
        <AppBar sx={{ position: 'fixed' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Subscribe
            </Typography>
            <Button type="submit" autoFocus color="inherit" >
              Proceed to Pay
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{p: 2, mt: 10}}>
        Subscribe to {movie.title}
        
        <TextField {...register('firstname')} id="fname" label="First Name" variant="outlined" fullWidth margin="dense"
        value={values.firstname}
        onChange={handleChange('firstname')}
        error = {errors.firstname}
        helperText={errors.firstname?.message}
        />


        <TextField {...register('lastname')} id="lname" label="Last Name" variant="outlined" fullWidth margin="dense"
        value={values.lastname}
        onChange={handleChange('lastname')}
        error = {errors.lastname}
        helperText={errors.lastname?.message}
        />
        <TextField {...register('email')} id="email" label="Email" variant="outlined" fullWidth margin="dense"
        value={values.email}
        onChange={handleChange('email')}
        error = {errors.email}
        helperText={errors.email?.message}
        />
        <TextField {...register('mobile')} id="mobile" label="Mobile" variant="outlined" fullWidth margin="dense"
        value={values.mobile}
        onChange={handleChange('mobile')}
        error = {errors.mobile}
        helperText={errors.mobile?.message}
        />
        <TextField {...register('address1')} id="address1" label="Address Line 1" variant="outlined" fullWidth margin="dense"
        value={values.address1}
        onChange={handleChange('address1')}
        error = {errors.address1}
        helperText={errors.address1?.message}
        />
        <TextField {...register('address2')} id="address2" label="Address Line 2" variant="outlined" fullWidth margin="dense"
        value={values.address2}
        onChange={handleChange('address2')}
        error = {errors.address2}
        helperText={errors.address2?.message}
        />
        <TextField {...register('city')} id="city" label="City" variant="outlined" fullWidth margin="dense"
        value={values.city}
        onChange={handleChange('city')}
        error = {errors.city}
        helperText={errors.city?.message}
        />
        <TextField {...register('state')} id="state" label="State" variant="outlined" fullWidth margin="dense"
        value={values.state}
        onChange={handleChange('state')}
        error = {errors.state}
        helperText={errors.state?.message}
        />
        <TextField {...register('country')} id="country" label="Country" variant="outlined" fullWidth margin="dense"
        value={values.country}
        onChange={handleChange('country')}
        error = {errors.country}
        helperText={errors.country?.message}
        />
        <TextField {...register('pincode')} id="pincode" label="Pincode" variant="outlined" fullWidth margin="dense"
        value={values.pincode}
        onChange={handleChange('pincode')}
        error = {errors.pincode}
        helperText={errors.pincode?.message}
        />
        
        </Box>
        </form>
      </Dialog>
        </>
        
    )
}

export default SubscribeBtn