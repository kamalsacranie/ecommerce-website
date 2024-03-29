import React, { useState, useEffect } from "react"
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { PayPalButton } from "react-paypal-button-v2"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {
  createOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions"
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants"

// should just follow the same naming convention wherever but too late now
function OrderScreen({ match, history }) {
  const orderId = match.params.id
  const dispatch = useDispatch()

  // initially our software development kit is not ready for paypal and once we load the
  // script this will be set to truw and then run the script to bring in the buttons
  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, error, loading } = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { success: successPay, loading: loadingPay } = orderPay // This used to be orderDeliver. That's why paypal wasnt updatinng

  const orderDeliver = useSelector(state => state.orderDeliver)
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  if (!loading && !error) {
    order.itemsPrice = order.order_items
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2) // This just happens locally on this page, it doesnt update our store
  }

  // Because we are using react we cant just put our script in our html like usual but we rather have to
  // innstall react-paypal v2 so we can have the buttons
  const payPalId =
    "AXdh4Z3YLp2dwJ_gkrgZanpy1bdq4LvPxZ68bY1r8a0wpkywdYgxaAiymoKpHrv05RUic1ryU7InvqDd"
  const addPayPalScript = () => {
    // Creating a script tag in our HTML page
    const script = document.createElement("script")
    // Setting the args within a HTML tag
    script.type = "text/javacript"
    script.src = `https://www.paypal.com/sdk/js?client-id=${payPalId}&currency=GBP`
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }

    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successDeliver
    ) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })

      dispatch(createOrderDetails(orderId))
    } else if (!order.is_paid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo]) // Just found out that dependencies are what causes this useEffect to fire when one of the values of the dependency changes

  const successPaymentHandler = paymentResult => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Shipping: </strong>
                {order.shipping_address.address}, {order.shipping_address.city},
                {"  "}
                {order.shipping_address.postcode},{"  "}
                {order.shipping_address.country}
              </p>
              {order.is_delivered ? (
                <Message variant="success">
                  Delivered on {order.delivered_at}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>

              <p>
                <strong>Method: </strong>
                {order.payment_method}
              </p>

              {order.is_paid ? (
                <Message variant="success">Paid on {order.paid_at}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.order_items.length === 0 ? (
                <Message variant="info">Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.order_items.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={4} className="py-3">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col className="py-3">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4} className="py-3">
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
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
                  <Col>Items: </Col>
                  <Col>${order.itemsPrice}</Col>{" "}
                  {/* itemsPrice defined earlier by runnign reduce functionn and adding up everything in order_items */}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${order.shipping_price}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax (included): </Col>
                  <Col>${order.tax_price}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>${order.total_price}</Col>
                </Row>
              </ListGroup.Item>

              {!order.is_paid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    // loading in our paypal button if its ready
                    <PayPalButton
                      amount={order.total_price}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.is_admin &&
              order.is_paid &&
              !order.is_delivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderScreen
