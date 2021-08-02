import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
// We want to have access to the histroy componet in our component
// Not sure why we cant do this like usual with the { history } destructure
// This gives us access the the history PROP IN OUR URL. like ?history=..
// I think the regular history prop only gets passed through on our homescreen
import { useHistory } from "react-router-dom"

function SearchBox() {
  const [keyword, setKeyword] = useState("")
  let history = useHistory()

  const submitHander = e => {
    e.preventDefault()
    if (keyword) {
      // When we submit the form we will set the keyword in our local state and then
      // redirect the user to the homepage with the use of the keyword from our state
      history.push(`/?keyword=${keyword}`)
    } else {
      history.push(history.push(history.location.pathname))
    }
  }

  return (
    <Form onSubmit={submitHander}>
      <Form.Control
        type="text"
        name="q"
        onChange={e => setKeyword(e.target.value)}
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>

      <Button
        type='submit'
        variant='outline-success'
        className='m-2'
      >Submit</Button>

    </Form>
  )
}

export default SearchBox