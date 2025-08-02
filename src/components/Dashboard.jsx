// client/src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link, useNavigate } from "react-router-dom";
import { getAllTransactionsAPI } from "../service/allApi";

const Dashboard = () => {
  // const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, profit: 0 });
  const [monthlyData, setMonthlyData] = useState([]);
  // const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  // const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getAllTransactionData();
  }, []);
  const getAllTransactionData = async () => {
    try {
      const res = await getAllTransactionsAPI();
      if (res.status >= 200 && res.status < 300) {
        // setTransactions(res.data);
        calculateSummary(res.data);
        calculateMonthlyData(res.data);
      }
    } catch (error) {
      console.log("error to get all tansaction data (Dashboard) : ", error);
    }
  };

  const calculateSummary = (data) => {
    if (user) {
      const income = data
        .filter(
          (trans) =>
            trans.userId === user?.id &&
            trans.type === "income" &&
            trans.status === "received"
        )
        .reduce((sum, b) => sum + b.amount, 0);
      const expense = data
        .filter(
          (val) =>
            val.userId === user?.id &&
            val.type === "expense" &&
            val.status === "paid"
        )
        .reduce((sum, b) => sum + b.amount, 0);
      setSummary({ income, expense, profit: income - expense });
    }
  };

  const calculateMonthlyData = (data) => {
    const monthly = {};
    data
      .filter((val) => val.userId === user?.id)
      .forEach((t) => {
        const month = new Date(t.date).toLocaleString("default", {
          month: "short",
        });

        if (!monthly[month]) {
          monthly[month] = { month, income: 0, expense: 0 };
        }
        if (t.type === "income") monthly[month].income += t.amount;
        else if (t.type === "expense") monthly[month].expense += t.amount;
      });
    setMonthlyData(Object.values(monthly));
  };

  return (
    <>
      <div className="container my-4 " style={{ minHeight: "75vh" }}>
        <div className="d-flex justify-content-between flex-wrap pb-2 pb-md-0">
          <h2 className="mb-4">📊 Dashboard</h2>
          <Link to={user ? "/add-income" : "/login"}>
            <button className="btn btn-success ">Add Transaction</button>
          </Link>
        </div>

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card border border-2 border-success mb-3">
              <div className="card-body d-flex justify-content-between">
                <div className="text-success">
                  <h5 className="card-title">💸 Total Income</h5>
                  <p className="card-text fs-4">₹{summary.income}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-2 border-danger mb-3">
              <div className="card-body d-flex justify-content-between ">
                <div className="text-danger">
                  <h5 className="card-title">🧾 Total Expense</h5>
                  <p className="card-text fs-4">₹{summary.expense}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-2 border-primary mb-3">
              <div className="card-body text-primary">
                <h5 className="card-title">📈 Net Profit</h5>
                <p className="card-text fs-4">₹{summary.profit}</p>
              </div>
            </div>
          </div>
        </div>

        {monthlyData.length > 0 ? (
          <div className="card">
            <div className="card-header">Monthly Income vs Expense</div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="income" fill="#198754" name="Income" />
                  <Bar dataKey="expense" fill="#dc3545" name="Expense" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="shadow p-2">
            {/* <h1 className="fw-bold text-center mt-5">
              FINDESK - <span>Accounting software</span>
            </h1>
            <h5
              className="text-center text-info my-5"
              style={{ lineHeight: "35px" }}
            >
              this software helps users to track their{" "}
              <b className="fs-4 text-danger">income</b> and{" "}
              <b className="fs-4 text-danger">expences</b> efficiantly and users
              anlyse their cahflow with graphs based on monthly data and you can
              download <b className="fs-4 text-danger">ledger</b> and{" "}
              <b className="fs-4 text-danger">profit and loss</b> account
              statement as <b className="fs-4 text-danger">PDf</b> .feel free to
              use the website properly and add your{" "}
              <b className="fs-4 text-danger">comments</b> and suggestions in 
              <b className="fs-4 text-danger"> footer</b>
            </h5> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
