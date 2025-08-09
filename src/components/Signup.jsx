import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUserAPI, getAllUserDataAPI } from "../service/allApi";
import Header from "./Header";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [usernameError, setUsernameError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getuserData();
  }, []);

  const getuserData = async () => {
    try {
      const res = await getAllUserDataAPI();
      if (res.status >= 200 && res.status < 300) {
        setUsers(res.data);
      }
    } catch (error) {
      console.log("error to get all user data (signup) : ", error);
    }
  };

  const handleAddUser = async (e) => {
    setUserName(false)
    e.preventDefault();
    if (username && password) {
      let userExist = true;

      try {
        users.forEach((u) => {
          if (userExist && u.username == username) {
            // toast.info(`${username} already exist in finDesk`);
            setUsernameError(true);
            userExist = false;
            return;
          }
        });
        if (userExist) {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user={
            username,
            password: hashedPassword,
            role: "user",
          }
          const res = await addUserAPI(user);
          console.log("register res",res.data);
          if (res.status >= 200 && res.status < 300) {
            sessionStorage.setItem('user',JSON.stringify(res.data))
            toast.success(`${username} successfully signuped`);
            navigate("/");
          }
        }
      } catch (error) {
        console.log("error to add user (Signup)", error);
      }
    }
  };
  return (
    <div>
      <div class="container mt-5 w-100 p-3">
        <div class="row justify-content-center">
          <div class="col-md-4 shadow">
            <h2 class="text-center fw-bold my-2">Register</h2>
            <form id="loginForm" className="w-100 p-3">
              <p className="d-none">error will shoe here</p>
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Enter username"
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              {usernameError&&<p className="text-danger fs-5 my-2">username already exist</p>}
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Enter password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="mt-3">
                already have an account?{" "}
                <Link to={"/login"} className="text-danger">
                  Login
                </Link>{" "}
              </p>
              <button
                onClick={(e) => handleAddUser(e)}
                class="btn btn-primary btn-block w-100"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
