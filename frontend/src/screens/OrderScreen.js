import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { createOrderDetails } from '../actions/orderActions'

// should just follow the same naming convention wherever but too late now

function OrderScreen({ match }) {
  const orderId = match.params.id
  const dispatch = useDispatch()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, error, loading } = orderDetails
  
  //   console.log(order)
  if (!loading && !error) {
      order.itemsPrice = order.order_items
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2) // This just happens locally on this page, it doesnt update our store
    }
    
    useEffect(() => {
        if (!order || order._id !== Number(orderId)) {
        dispatch(createOrderDetails(orderId))
    }
  }, [order, orderId]) // Just found out that dependencies are what causes this useEffect to fire when one of the values of the dependency changes
  return loading ? (
      <Loader />
  ) : error ? (
      <Message variant='danger'>{error}</Message>
  ) : (
    <div>
        <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong>{order.user.name}</p>
              <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Shipping: </strong>
                {order.shipping_address.address}, {order.shipping_address.city},
                {"  "}
                {order.shipping_address.postcode},{"  "}
                {order.shipping_address.country}
              </p>
              {order.is_delivered ? (
                <Message variant='success'>Delivered on {order.delivered_at}</Message>
              ) : (
                <Message variant='warning'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>

              <p>
                <strong>Method: </strong>
                {order.payment_method}
              </p>

              {order.is_paid ? (
                <Message variant='success'>Paid on {order.paid_at}</Message>
              ) : (
                <Message variant='warning'>Not Paid</Message>
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
                        <Col md={4} className='py-3'>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col className='py-3'>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4} className='py-3'>
                          {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items: </Col>
                  <Col>${order.itemsPrice}</Col> {/* itemsPrice defined earlier by runnign reduce functionn and adding up everything in order_items */}
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

            </ListGroup>
          </Card>
        <Col md={4}></Col>
      </Row>
    </div>
  );
}

export default OrderScreen;