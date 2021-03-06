import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { formatPrice } from "../utils/helpers";

function PlaceOrderScreen(props) {
  const { history } = props;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, error, success } = orderCreate;

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 1500 ? 0 : 500).toFixed(2);
  cart.taxPrice = Number(cart.itemsPrice * 0.18).toFixed(2);
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order.id}`);
    }
    dispatch({
      type: ORDER_CREATE_RESET,
    });
  }, [success, history, dispatch, order]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row className="my-3">
        <Col md={8}>
          <ListGroup variant="">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <em>
                  <strong>
                    Shipping : {"  "} {cart.shippingAddress.address}, {"  "}
                    {cart.shippingAddress.city}, {"  "}
                    {cart.shippingAddress.postalCode},{"  "}
                    {cart.shippingAddress.country}
                  </strong>
                </em>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>
                  Method : {"  "} {cart.paymentMethod}
                </strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your Cart is Empty</Message>
              ) : (
                <ListGroup>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            key={index}
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {formatPrice(item.price)} =
                          {formatPrice((item.qty * item.price).toFixed(2))}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item :</Col>
                  <Col>{formatPrice(cart.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping :</Col>
                  <Col>{formatPrice(cart.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax :</Col>
                  <Col>{formatPrice(cart.taxPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price :</Col>
                  <Col>{formatPrice(cart.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
                {error && (
                  <Message variant="danger">
                    {error}! Try Reloading, If error persist, LOGIN AGAIN !!!
                  </Message>
                )}
              <ListGroup.Item>
                <Button
                  type="button"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                  className="btn btn-block"
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
