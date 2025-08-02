import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { getAllTransactionsAPI } from "../service/allApi";
import html2pdf from "html2pdf.js";
import Footer from "../components/Footer";

const ProfitLoss = () => {
  const [summary, setSummary] = useState({ income: 0, expense: 0, net: 0 });
  useEffect(() => {
    getAllTransactionData();
  }, []);
  const pdfRef = useRef(); //for download part
  // useEffect(()=>{
  const user = JSON.parse(sessionStorage.getItem("user"));
  // },[])

  const getAllTransactionData = async () => {
    try {
      if (user) {
        const res = await getAllTransactionsAPI();
        if (res.status >= 200 && res.status < 300) {
          const data = res.data.filter((val) => val.userId === user.id);
          // setUserTransactions(data);
          getProfitAndLoss(data);
        }
      }
    } catch (error) {
      console.log("error to get all tansaction data (Ledger) : ", error);
    }
  };
  const getProfitAndLoss = (transactions) => {
    const income = transactions
      .filter((txn) => txn.type === "income")
      .reduce((sum, txn) => sum + Number(txn.amount), 0);

    const expense = transactions
      .filter((txn) => txn.type === "expense")
      .reduce((sum, txn) => sum + Number(txn.amount), 0);

    const net = income - expense;
    setSummary({ income, expense, net });
  };

  // handle the pdf downloading
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
    <div>
      {/* <Header /> */}
      <div className="container mt-5">
        <div className="d-flex justify-content-between p-3">
          <button onClick={handleDownloadPDF} className="btn btn-info ms-auto">
            Download PDF
          </button>
        </div>

        <div className="row text-center" ref={pdfRef}>
          <h2 className="text-center mb-4 fw-bold ">Profit & Loss Statement</h2>
          <div className="col-md-4">
            <div className="card border border-2 border-success mb-3">
              <div className="card-header bg-success text-white">
                Total Income
              </div>
              <div className="card-body">
                <h5 className="card-title">₹ {summary.income}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-2 border-danger mb-3">
              <div className="card-header bg-danger text-white">
                Total Expenses
              </div>
              <div className="card-body">
                <h5 className="card-title">₹ {summary.expense}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className={`card border-2 border-${
                summary.net >= 0 ? "primary" : "warning"
              } mb-3`}
            >
              <div
                className={`card-header bg-${
                  summary.net >= 0 ? "primary" : "warning"
                } text-white`}
              >
                {summary.net >= 0 ? "Net Profit" : "Net Loss"}
              </div>
              <div className="card-body">
                <h5 className="card-title">₹ {Math.abs(summary.net)}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfitLoss;
