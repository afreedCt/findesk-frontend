// AddTransactionForm.jsx
import React, { useEffect, useState } from "react";
import Login from "./Login";
import Header from "./Header";
import { addTransactionAPI, getAllTransactionsAPI } from "../service/allApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";

const AddTransactionForm = () => {
  const [date, setDate] = useState("");
  const [account, setAccount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [userTransactions, setUserTransactions] = useState([]);
  console.log("userTransactions", userTransactions);
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    getAllTransactionData();
  }, []);
  const getAllTransactionData = async () => {
    try {
      const res = await getAllTransactionsAPI();
      if (res.status >= 200 && res.status < 300) {
        setUserTransactions(res.data.filter((val) => val.userId === user.id));
      }
    } catch (error) {
      console.log("error to get all tansaction data (Dashboard) : ", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      userId: user.id,
      username: user.username,
      date,
      account,
      type,
      category,
      amount: parseFloat(amount),
      description,
      status,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    // onSubmit(newTransaction);
    try {
      const res = await addTransactionAPI(newTransaction);
      console.log("res", res);
      if (res.status >= 200 && res.status < 300) {
        toast.success(`${newTransaction.type} added successfully`);
        navigate("/");
      }
    } catch (error) {
      console.log("error to add a new transaction (AddTransactionForm) : ", error);
    }
    // Reset form
    setDate("");
    setAccount("");
    setType("");
    setCategory("");
    setAmount("");
    setDescription("");
    setStatus("");
  };

  return (
    <>
      {/* <Header /> */}
      {isLoggedIn ? (
        <div>
          <div className="card mt-4 shadow mx-3">
            <Link
              to={"/"}
              className="left-arrow text-decoration-none text-black ms-auto me-5 fs-2 p-1 my-1 cursor-pointer"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <div className="card-header fs-3 fw-bold text-center">
              Add New Transaction
            </div>
            <div className="card-body">
              <form className="row" onSubmit={handleSubmit}>
                <div className="mb-3 col-md-6">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label>Account</label>
                  <select
                    className="form-select"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    required
                  >
                    <option value="">Select Account</option>
                    <option value="cash">Cash</option>
                    <option value="bank">Bank</option>
                    <option value="credit">Credit</option>
                  </select>
                </div>

                <div className="mb-3 col-md-6">
                  <label>Type</label>
                  <select
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div className="mb-3 col-md-6">
                  <label>Status</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="received">Received</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </div>

                <div className="mb-3 col-md-6">
                  <label>Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    placeholder="Enter category"
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label>Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    placeholder="Enter amount"
                  />
                </div>

                <div className="mb-3 ">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Enter description"
                  ></textarea>
                </div>

                <button className="btn btn-success" type="submit">
                  Add Transaction
                </button>
              </form>
            </div>
          </div>
            <h3 className="fs-2 fw-bold text-center my-3">All Transactions</h3>
          <div style={{overflowX:"auto"}}>
            {userTransactions.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>category</th>
                    <th>Account</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {userTransactions.map((item, index) => (
                    <tr key={item.id + index}>
                      <td>{index + 1}</td>
                      <td>{item.category}</td>
                      <td>{item.account}</td>
                      <td>{item.type}</td>
                      <td>{item.amount}</td>
                      <td>
                        {item.date}
                        {"--"}
                        {item.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div>no items to display</div>
            )}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default AddTransactionForm;
