import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import Ledger from './pages/Ledger'
import Payable from './pages/Payable'
import Receivables from './pages/Receivables'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ProfitLoss from './pages/ProfitLoss'
import Signup from './components/Signup'
import Login from './components/Login'
import AddTransactionForm from './components/AddTransactionForm'
import { ToastContainer } from "react-toastify";
import Header from './components/Header'
import AdminDashboard from './pages/AdminDashboard'
import AllTransactions from './pages/AllTransactions'
import AllComments from './pages/AllComments'
import Footer from './components/Footer'

const App = () => {
  const [user,setUser]=useState({})
  // console.log("sorted user",user);
  
  const navigate=useNavigate()
  useEffect(()=>{
    const SotredUser = sessionStorage.getItem("user")
    if(SotredUser){
      setUser(JSON.parse(SotredUser))
    }

  },[])
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick={false}
        theme="colored"
      />
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/ledger" element={<Ledger/>} />
        <Route path="/payable" element={<Payable/>} />
        <Route path="/profitloss" element={<ProfitLoss/>} />
        <Route path="/receivables" element={<Receivables/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/add-income' element={<AddTransactionForm/>}/>
        <Route path='/admin' element={user && user?.role==='admin'?<AdminDashboard/>:<Login/>}/>
        <Route path='/all-transactions' element={user && user?.role=='admin'?<AllTransactions/>:<Login/>}/>
        <Route path='/all-comments' element={user && user?.role=='admin'?<AllComments/>:<Login/>}/>
      </Routes>
      {/* <Footer/> */}
    </>
  )
}

export default App