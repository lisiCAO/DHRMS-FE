"use client";
import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "@/components/PaymentForm";
import { Paper } from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51P7TI4P3cmRrhFzQKywkqocQwz392vbllX5nmlXOZUwwULv5X8tm4TgVqdJB0RL3Oaukdjg0gCzWGd1d6paqyL0P00ypuLUfmR"
);

const Payment = () => {
  return (
    <Paper elevation={3} style={{ padding: "10px", margin: "10px" }}>
      {/* Elements is the provider that lets us access the Stripe object. 
     It takes the promise that is returned from loadStripe*/}
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </Paper>
  );
}

export default Payment;
