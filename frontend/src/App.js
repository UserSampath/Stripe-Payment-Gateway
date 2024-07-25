import './App.css';
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
const apiURL = "http://localhost:8000";
const Stripe_key =
  "pk_test_51OdQtxLfF5C2F9EbALHYFvfVlKus1fqttOJ6UnIhVvh7O7IyRbB5u0pdKyWN4PV9AVQ3G5iRYXLT8KaSGwExpnUJ00WDo6B0Q3";
function App() {
  const cartItems = [{ title: "title xx", image: "https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721174400&semt=sph", price: 10, quantity: 2 }, { title: "title xx", image: "https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721174400&semt=sph", price: 10, quantity: 2 }]
  const makePayment = async () => {
    const stripe = await loadStripe(Stripe_key);

    const body = {
      products: cartItems,
    };

    const headers = {
      "content-type": "application/json",
    };

    const response = await fetch(`${apiURL}/payment/crete-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();
    const result = stripe.redirectToCheckout({ sessionId: session.id });
    console.log("🚀 ~ makePayement ~ result:", result)
    if (result.error) {
      console.log(result.error);
    }
  };

  const makePaymentForSubscription = async (type) => {
    const stripe = await loadStripe(Stripe_key);

    const body = {
      type
    };

    const headers = {
      "content-type": "application/json",
    };

    const response = await fetch(`${apiURL}/payment/crete-checkout-session-sub`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();
    const result = stripe.redirectToCheckout({ sessionId: session.id });
    console.log("🚀 ~ makePayement ~ result:", result)
    if (result.error) {
      console.log(result.error);
    }
  };

  const customerPortalHandler = async () => {
    const stripe = await loadStripe(Stripe_key);

    const body = {
      products: "d",
    };

    const headers = {
      "content-type": "application/json",
    };

    const response = await fetch(`${apiURL}/payment/customerPortal`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();
    console.log("🚀 ~ customerPortalHandler ~ session:", session)
    // const result = stripe.redirectToCheckout({ sessionId: session.id });
    console.log("🚀 ~ makePayement ~ result:", session)
    window.location.href = session.url;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "100px" }}>  <div >
      <div onClick={makePayment}>
        <div style={{ cursor: "pointer", fontSize: "25px", margin: "10px" }}>Buy products</div>
      </div>
      <hr></hr>
      <div style={{ display: "flex", gap: "20px" }}>
        <div onClick={() => makePaymentForSubscription("starter")}>
          <div style={{ cursor: "pointer", fontSize: "25px", margin: "10px" }}>Starter subscription</div>
        </div>
        <div onClick={() => makePaymentForSubscription("pro")}>
          <div style={{ cursor: "pointer", fontSize: "25px", margin: "10px" }}>Pro subscription</div>
        </div>
      </div>
      <hr></hr>
      <div onClick={customerPortalHandler}>
        <div style={{ cursor: "pointer", fontSize: "25px", margin: "10px" }}>customer portal</div>
      </div>

    </div></div>

  );
}

export default App;
