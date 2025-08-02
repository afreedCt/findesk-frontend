import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import { getAllTransactionsAPI } from "../service/allApi";
import html2pdf from "html2pdf.js";
import Table from "react-bootstrap/esm/Table";
import Footer from "../components/Footer";

const Ledger = () => {
  const [userTransactions, setUserTransactions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("Cash");
  console.log("ledger page ", userTransactions, selectedAccount);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const pdfRef = useRef();

  useEffect(() => {
    getAllTransactionData();
  }, [selectedAccount]);
  const getFilteredTransactions = (data) => {
    // console.log("filtered transactions",data);
    const res = data
      .filter((val) => val.account === selectedAccount.toLowerCase())
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log("filtered transactions", res);
    setFilteredTransactions(res);
  };
  const user = JSON.parse(sessionStorage.getItem("user"));
  const getAllTransactionData = async () => {
    try {
      if (user) {
        const res = await getAllTransactionsAPI();
        if (res.status >= 200 && res.status < 300) {
          const data = res.data.filter((val) => val.userId === user.id);
          setUserTransactions(data);
          getFilteredTransactions(data);
        }
      }
    } catch (error) {
      console.log("error to get all tansaction data (Ledger) : ", error);
    }
  };
  let runningBalance = 0;

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0.3,
      filename: "profit-loss-summary.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };
  return (
    <>
      {/* <Header /> */}
      <div className="container mt-4">
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <label className="fs-5 fw-bold ">Select Account</label>
            {filteredTransactions.length > 0 && (
              <button className="btn btn-info mb-1" onClick={handleDownloadPDF}>
                Dowload Ledger
              </button>
            )}
          </div>
          <select
            className="form-select"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
          >
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            <option value="Credit">Credit</option>
            {/* {/* <option value="Sales">Sales</option> */}
            {/* Add more as needed */}
          </select>
        </div>
        <div ref={pdfRef} className="shadow">
          <h2 className="fw-bold text-center">
            Ledger - {selectedAccount} - Account
          </h2>
          {filteredTransactions.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx, index) => {
                  const isDebit = tx.type === "expense";
                  const amount = parseFloat(tx.amount);
                  runningBalance += isDebit ? -amount : amount;
                  return (
                    <tr key={index}>
                      <td>{tx.date}</td>
                      <td>{tx.description}</td>
                      <td>{tx.status}</td>
                      <td>{isDebit ? `₹${amount}` : "-"}</td>
                      <td>{!isDebit ? `₹${amount}` : "-"}</td>
                      <td>₹{runningBalance.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div className="my-3 text-danger fw-bold text-center my-4">
              No transaction found with {selectedAccount} Account
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Ledger;
