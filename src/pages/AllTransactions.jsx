import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAllTransactionsAPI, getAllUserDataAPI } from "../service/allApi";

const AllTransactions = () => {
    const [users, setUsers] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

//   console.log("trans",transactions);
  console.log("selected",selectedAccount);
  
  useEffect(() => {
    getAllUsersData();
    getAllTransactionData()
  }, [selectedAccount]);

  const getAllUsersData = async () => {
    try {
      const res = await getAllUserDataAPI();
    //   console.log(res.data);
      if(res.status>=200 && res.status<300){
        const Allusers=res.data.filter((item) => item.role !== "admin")
          setUsers(Allusers);
        //   setSelectedAccount(Allusers[0]?.username)
      }
    } catch (error) {
      console.log("error to get all users data (AdminDashboard) ", error);
    }
  };

  const getAllTransactionData = async () => {
    try {
      const res = await getAllTransactionsAPI();
      if (res.status >= 200 && res.status < 300) {
        // console.log(res.data);
        
        const data=res.data.filter((item)=>item.username===selectedAccount)
        setTransactions(data)
      }
    } catch (error) {
      console.log("error to get all tansaction data (Dashboard) : ", error);
    }
  };
  return (
    <div>
        <h4 className="mt-3 ms-3">select an account</h4>
      <select
        className="form-select"
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value)}
      >
        {users.map((item, index) => (
          <option key={item.id} value={item.username}>{item.username}</option>
        ))}
      </select>
      <h1 className="mt-3 ms-5 fw-bold ">All Transactions of {selectedAccount}</h1>
      <hr />
      {
          transactions.length>0?(
            <div style={{overflowX:"auto"}}>
              <Table  striped bordered hover>
        <thead>
          <tr>
            <th>transaction id</th>
            <th>username</th>
            <th>account</th>
            <th>type</th>
            <th>category</th>
            <th>status</th>
            <th>Date and Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item, index) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.account}</td>
              <td>{item.type}</td>
              <td>{item.category}</td>
              <td>{item.status}</td>
              <td>{item.date}{' '}{item.time}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
        ):(
            <div className="text-center text-danger"><p>no transactions found with <span className="fw-bold fs-3">{selectedAccount} </span>Account</p></div>
        )
      }
    </div>
  );
};

export default AllTransactions;
