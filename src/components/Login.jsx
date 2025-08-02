import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAPI } from "../service/allApi";
import Header from "./Header";
import bcrypt from "bcryptjs";

const Login = () => {
    const [username,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [users,setUsers]=useState([])
    const [passwordError,setPasswordError]=useState(false)
    const [usernameError,setUsernameError]=useState(false)
    console.log(username,password,users);
    const navigate=useNavigate()

    const user=JSON.parse(sessionStorage.getItem('user'))
    const handleLogin=async(e)=>{
        e.preventDefault()
         if (username && password) {
            setUsernameError(false)
            setPasswordError(false)
            try {
                 const res=await loginUserAPI()
            if(res.data.length>0){
                setUsers(res.data)
                const user=res.data.find((user)=>user.username===username)
                if(user){
                  const ispassword=await bcrypt.compare(password,user.password)
                  console.log('ispassword',ispassword);
                  
                    if(ispassword){
                        console.log("hello ",user)
                        sessionStorage.setItem('user',JSON.stringify(user))
                        if(user.role==='admin'){
                          console.log("going to admin page");
                          navigate('/admin')
                        }else{
                          console.log('going to user page');
                          
                          navigate('/')
                        }
                    }else{
                        setPasswordError(true)
                    }
                }else{
                    setUsernameError(true)
                }
            }else{
                setUsernameError(true)
                console.log("no users in database");
            }
            } catch (error) {
                console.log("error to fetch all users data (Login) ",error)
            }
         }
    }
  return (
    <div>
      {/* <Header/> */}
          <div class="container mt-5 w-100 p-3">
        <div class="row justify-content-center ">
          <div class="col-md-4 shadow">
            <h2 class="text-center fw-bold mt-2">Login</h2>
            <form id="loginForm" className=" w-100 p-3">
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
                {usernameError&&<p className="text-danger ms-2 " id="usernameError">username not found</p>}
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
                {passwordError&&<p className="text-danger ms-2 " id="passwordError">password is inccorect</p>}
              </div>
              <p className="mt-3">
                dont have an account? <Link to={'/signup'} >Signup</Link>{" "}
              </p>
              <button
                onClick={(e) => handleLogin(e)}
                class="btn btn-primary btn-block w-100"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
