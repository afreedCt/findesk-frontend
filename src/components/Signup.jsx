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
  console.log(users);
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
    e.preventDefault();
    if (username && password) {
      let userExist=true;
      
        try {
          users.forEach((u) => {
            if (userExist && u.username == username ) {
              toast.info(`${username} already exist`);
              userExist = false;
              return 
            }
          });
          if (userExist) {
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
  
            const res = await addUserAPI({
              username,
              password: hashedPassword,
              role: "user",
            });
            console.log(res);
            if (res.status >= 200 && res.status < 300) {
              toast.success(`${username} successfully signuped`);
              navigate("/login");
            }
          }
        } catch (error) {
          console.log("error to add user (Signup)", error);
        }
      
    }
  };
  return (
    <div>
      {/* <Header/> */}
      <div class="container mt-5 w-100 p-3">
        <div class="row justify-content-center">
          <div class="col-md-4 shadow">
            <h2 class="text-center fw-bold">Signup</h2>
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
                already have an account? <Link to={"/login"}>Login</Link>{" "}
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
