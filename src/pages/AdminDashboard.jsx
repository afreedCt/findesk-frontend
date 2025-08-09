import React, { useEffect, useState } from "react";
import {
  deleteUserAPI,
  // deleteUserAPI,
  getAllUserDataAPI,
  // updateUserDelete,
  updateUserRoleAPI,
} from "../service/allApi";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
// import DeleteModal from "../components/DeleteModal";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import SERVER_URL from "../service/server";
import axios from "axios";
import DeleteModal from "../components/DeleteModal";

const AdminDashboard = () => {
  const [show, setShow] = useState(false); //for chenger user role modal
  const [userDetails, setUserDetails] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(userDetails?.role);

  const [showModal, setShowModal] = useState(false); //for delete modal component
  // console.log("before showmodal : ", showModal);

  const handleClose = () => {
    setUserDetails({});
    setShow(false);
  };
  const handleShow = (userData) => {
    setUserDetails(userData);
    setSelectedAccount(userData?.role);

    setShow(true);
  };

  const [users, setUsers] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const navigate = useNavigate();
  useEffect(() => {
    getAllUsersData();
  }, []);
  const getAllUsersData = async () => {
    try {
      const res = await getAllUserDataAPI();
      setUsers(res.data.filter((item) => item.id !== user?.id));
    } catch (error) {
      console.log("error to get all users data (AdminDashboard) ", error);
    }
  };

  const handleChangeRole = async () => {
    if (selectedAccount == userDetails?.role) {
      toast.warning(`${userDetails?.username} is an ${userDetails?.role}`);
      return;
    }

    try {
      const newUserData = { ...userDetails, role: selectedAccount };

      const res = await updateUserRoleAPI(newUserData?.id, newUserData);
      console.log(res);
      if (res.status >= 200 && res.status < 300) {
        toast.success(`${userDetails?.username} changed to ${selectedAccount}`);
        getAllUsersData();
        handleClose();
      }
    } catch (error) {
      console.log("error to update user data (AdminDashboard) : ", error);
    }
  };

  const handleDeleteUser = async () => {
    console.log("userData delete===", userDetails?.id);
    if (!userDetails?.id) {
      console.error("Invalid userId");
      return;
    }
    try {
      const res = await deleteUserAPI(userDetails?.id);
      console.log("Delete request sent. Refreshing data...");
      toast.success(`${userDetails?.username} deleted successfully`);
      getAllUsersData();
      setShowModal(false);
      setUserDetails({});
      // if (res.status >= 200 && res.status < 300) {
      //   getAllUsersData();
      //   setShowModal(false);
      //   setUserDetails({});
      // }
    } catch (error) {
      console.log("error to delete user : ", error);
    }
  };

  return (
    <div>
      {user && user.role == "admin" ? (
        <div>
          <h1 className="mt-5 ms-5 fw-bold">All Users</h1>
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>id</th>
                  <th>username</th>
                  <th>password</th>
                  <th>role</th>
                  <th>...</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => (
                  <tr key={item?.id}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>
                      {item.role ? item.role : "-"}
                      {item.role ? (
                        <i
                          style={{ cursor: "pointer" }}
                          className="fa-solid fa-user-pen ms-2"
                          onClick={() => handleShow(item)}
                        ></i>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>
                      <i
                        onClick={() => {
                          setShowModal(true);
                          setUserDetails(item);
                        }}
                        style={{ cursor: "pointer" }}
                        className="fa-solid fa-trash text-danger"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* modal to update a user role */}
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>change user role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label htmlFor="" className="my-2">
                Select role
              </label>
              <select
                className="form-select"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
                {/* Add more as needed */}
              </select>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant=""
                className="btn btn-danger"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button variant="info" onClick={handleChangeRole}>
                Change
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <Login />
      )}
      {/* delete modal (deleting a user) */}
      <DeleteModal
        message={
          "are you sure you want to delete " + userDetails.username + " ?"
        }
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setUserDetails({});
        }}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
};

export default AdminDashboard;
