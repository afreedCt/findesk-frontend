import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate()
  const isLoggedIn=sessionStorage.getItem("isLoggedIn")
  const user=JSON.parse(sessionStorage.getItem('user'))

  // console.log("logged in ", isLoggedIn,"----",user);
  return (
    <div>
      <Dashboard/>
      <Footer/>
    </div>
  );
};

export default Home;
