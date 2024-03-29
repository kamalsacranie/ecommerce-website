import React, { useState, useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import Loader from "../components/Loader"
import Message from "../components/Message"
import { listProducts, deleteProduct, createProduct } from "../actions/productActions"
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function ProductListScreen({ history, match }) {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector(state => state.productDelete)
  // Again we destructure these into loading delete etc becasue we already have variables
  // By the same name above
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector(state => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    // dispatch({type: PRODUCT_CREATE_RESET}) // look into the object type thing here in docs

    if (!userInfo.is_admin) {
      history.push("/login")
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
      dispatch({type: PRODUCT_CREATE_RESET})
    } else {
      dispatch(listProducts())
    }

  }, [
    dispatch, 
    history, 
    userInfo, 
    successDelete,
    successCreate,
    createdProduct,
  ])

  const deleteHandler = id => {
    if (window.confirm("Are you sure you want to delete this products?")) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right d-inline-flex">
          <Button className="my-3 ms-auto" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered responsive hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>IN STOCK</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.count_in_stock}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>

                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="dark" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default ProductListScreen
