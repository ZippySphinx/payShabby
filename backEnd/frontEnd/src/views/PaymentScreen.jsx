import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen(props) {
  const { history } = props;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping/");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder/");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3">
          <Form.Label className="my-3" as="legend">
            Select Payment Method
          </Form.Label>
          <Col>
            <Form.Check
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(event) => setPaymentMethod(event.target.value)}
              type="radio"
              label="PayPal or Credit Card"
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button className="my-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
