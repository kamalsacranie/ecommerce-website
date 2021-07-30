import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'

import Loader from "../components/Loader"
import Message from "../components/Message"
import FormContainer from "../components/FormContainer"
import { listProductDetails, updateProduct } from "../actions/productActions"
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductUserScreen({ match, history }) {
  const productId = match.params.id

  const [name, setName] = useState("")
  const [price, setPrice] = useState("0")
  const [image, setImage] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState("")
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch() // thing dispatch is like. you dispatch the new info to your state

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  const { userInfo } = useSelector(state => state.userLogin)
  // console.log(userInfo.token)

  useEffect(() => {

    if (successUpdate) {
      dispatch({type: PRODUCT_UPDATE_RESET})
      history.push('/admin/productlist') // redirecting the user on success of updating the product
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.count_in_stock)
        setDescription(product.description)
      }
    }
    
  }, [product, productId, history, dispatch, successUpdate])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(updateProduct({
      _id: productId, // dunno how we can use _id here when its not defined. By using the : are we defining it as productId, why not just use =. idk will have to check
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    }))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    console.log(file)
    const formData = new FormData()

    formData.append('image', file) // This is how we send it to the backend. We create a new key value pair to send with the form
    formData.append('product_id', productId) // we use snake case here because this is how we referenced it in the backend

    setUploading(true) // changing our react upload state to true to dispaly our loader

    try {
      // We need to create a custom post request to get our files? I think?
      const config = {
        header: {
          "Content-type": "multipart/form-data", // this is what lets us send the image with our post request
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.post(
        '/api/products/upload/',
        formData,
        config
      )

      setImage(data) // gives us the new image path
      setUploading(false)

    } catch (error) {
      setUploading(false)
    }

  }

  return (
    <div>
      <Link to="/admin/productlist">Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>

            {/* We could literally just make each of these into a compnent */}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image"
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>

              <Form.File
                className="py-3"
                id="image-file"
                custom
                onChange={uploadFileHandler}
              >
              </Form.File>

              {uploading && <Loader />}

            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={e => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Stock"
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={e => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}

export default ProductUserScreen
