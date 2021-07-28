import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'

import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen({ history }) {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [warnMessage, setWarnMessage] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch() // thing dispatch is like. you dispatch the new info to your state

    const userDetails = useSelector(state => state.userDetails) // This is us getting the userLogin from our stile which is stored in store.js
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin) // This is us getting the userLogin from our stile which is stored in store.js
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
    
    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET }) // updating this part of our state
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, user, dispatch, success])

    const submitHandler = (e) => {
        e.preventDefault() // This is the MOFO that stops the page from auto reloading for somereason ffs. Took so long to find
        // great resource [here](https://www.robinwieruch.de/react-preventdefault) about preventDefault(): TLDR it makes it so
        // The page doesnt refresh

        if (password != confirmPassword) {
            setWarnMessage('Passwords do not match')
            setMessage('')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
            setMessage('Details updated!')
            setWarnMessage('')
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {warnMessage && <Message variant='danger'>{warnMessage}</Message>}
                {message && <Message variant='success'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3'>
                        Register
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table striped responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th 
                                  style={{textAlign: 'center'}}
                                >Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead> 

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.created_at.substring(0, 10)}</td>
                                    <td>${order.total_price}</td>
                                    <td 
                                      style={{textAlign: 'center'}}
                                    >{order.is_paid ? order.paid_at.substring(0, 10) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
