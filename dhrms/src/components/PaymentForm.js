import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Paper, TextField, Button, Container, Typography, Grid } from "@mui/material";
import { useRouter } from "next/navigation";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  // Validation schema
  const validationSchema = Yup.object({
    amount: Yup.number().required("Amount is required").positive(),
    leaseId: Yup.string().required("Lease ID is required"),
    landLordId: Yup.string().required("Landlord ID is required"),
    paidByUserId: Yup.string().required("Paid By User ID is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      amount: "",
      leaseId: "",
      landLordId: "",
      paidByUserId: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!stripe || !elements) {
        return;
      }

      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      const { error, token } = await stripe.createToken(cardNumberElement);

      if (!error) {
        axios
          .post("http://localhost:8080/api/payments/", {
            token: token.id,
            amount: parseFloat(values.amount),
            leaseId: parseInt(values.leaseId),
            landLordId: parseInt(values.landLordId),
            paidByUserId: parseInt(values.paidByUserId),
          })
          .then((resp) => {
            alert("Your payment was successful");
            router.push("/next-page");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log(error);
      }
    },
  });

  return (
    
      <Container>
        <Typography variant='h4' align='center'>
          Payment Form
        </Typography>
        <Typography variant='subtitle1' align='center'>
          Please fill out the form below to make a payment.
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            required
            name='amount'
            label='Amount'
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
            fullWidth
            margin='normal'
          />
          <TextField
            required
            name='leaseId'
            label='Lease ID'
            value={formik.values.leaseId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.leaseId && Boolean(formik.errors.leaseId)}
            helperText={formik.touched.leaseId && formik.errors.leaseId}
            fullWidth
            margin='normal'
          />
          <TextField
            required
            name='landLordId'
            label='Landlord ID'
            value={formik.values.landLordId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.landLordId && Boolean(formik.errors.landLordId)}
            helperText={formik.touched.landLordId && formik.errors.landLordId}
            fullWidth
            margin='normal'
          />
          <TextField
            required
            name='paidByUserId'
            label='Paid By User ID'
            value={formik.values.paidByUserId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.paidByUserId && Boolean(formik.errors.paidByUserId)}
            helperText={formik.touched.paidByUserId && formik.errors.paidByUserId}
            fullWidth
            margin='normal'
          />
          <div className='form-group'>
            <label htmlFor='cardNumber'>Card Number:</label>
            <div style={{ marginLeft: "10px" }}>
              <CardNumberElement id='cardNumber' />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='cardExpiry'>Card Expiry:</label>
            <div style={{ marginLeft: "10px" }}>
              <CardExpiryElement id='cardExpiry' />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='cardCvc'>Card CVC:</label>
            <div style={{ marginLeft: "10px" }}>
              <CardCvcElement id='cardCvc' />
            </div>
          </div>
          <Grid item xs={12}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              style={{ marginRight: "10px" }}>
              Pay
            </Button>
            <Button
              onClick={() => router.back()}
              variant='contained'
              color='primary'>
              Cancel
            </Button>
          </Grid>
        </form>
      </Container>
    
  );
};

export default PaymentForm;
