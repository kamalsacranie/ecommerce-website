import React, { useState, useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import Loader from "../components/Loader"
import Message from "../components/Message"
import { listUsers, deleteUser } from "../actions/userActions"

function UserListScreen({ history }) {
  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // When we delete a user we want to update our listUsers so we need to use this in
  // our useEffect
  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete

  // We dont want to dispatch this to state unelss we are an admin
  // Hence we add in condition to prevent it. We redirect user to home
  useEffect(() => {
    if (userInfo && userInfo.is_admin) {
      dispatch(listUsers())
    } else {
      history.push("/login")
    }
  }, [dispatch, history, successDelete, userInfo]) // Hence this dispatches when successDelete value changes which
  // update our list of users by dispatching listUsers to state and then reach pulls them in in th JSX

  const deleteHandler = id => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div>
      <h1>Users</h1>
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.is_admin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="dark" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
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

export default UserListScreen
