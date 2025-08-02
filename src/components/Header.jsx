import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { toast } from "react-toastify";
import UpdateUserModal from "./UpdateUserModal";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [selectedMode, setSelectedMode] = useState("btnradio1");
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false); //for delete modal component
  const [password,setPassword]=useState('')
  const [username,setUsername]=useState('')

  // const toggleTheme = (mode) => {
  //   const isDark = mode === "btnradio2";
  //   setDarkMode(isDark);
  //   document.body.setAttribute("data-bs-theme", isDark ? "dark" : "light");
  // };
  const handleSession = () => {
    navigate("/");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("user");
    location.reload();
  };

  const handleModalShow = () => { 
      setShowModal(true);
  };

  const handleUpdateUser = () => {};
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-dark w-100"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          {user?.role !== "admin" && (
            <Link
              to={"/"}
              className="navbar-brand fw-bold fs-4"
              style={{ fontFamily: "arial,sans-sarif" }}
            >
              finDesk
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              to={"/admin"}
              className="navbar-brand fw-bold fs-4"
              style={{ fontFamily: "arial,sans-sarif" }}
            >
              finDesk-admin
            </Link>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              {user?.role !== "admin" && (
                <li className="nav-item">
                  <Link to={user ? "/ledger" : "/login"} className="nav-link">
                    Ledger
                  </Link>
                </li>
              )}
              {user?.role === "admin" && (
                <li className="nav-item">
                  <Link to={"/all-transactions"} className="nav-link">
                    all transactions
                  </Link>
                </li>
              )}
              {user?.role === "admin" && (
                <li className="nav-item">
                  <Link to={"/all-comments"} className="nav-link">
                    all comments
                  </Link>
                </li>
              )}
              {user?.role !== "admin" && (
                <li className="nav-item">
                  <Link
                    to={user ? "/profitloss" : "/login"}
                    className="nav-link"
                  >
                    Profit and Loss
                  </Link>
                </li>
              )}
              {/* {user?.role !== "admin" && (
                <li className="nav-item">
                  <Link to={"/comments"} className="nav-link">
                    comments
                  </Link>
                </li>
              )} */}
              {/* {user?.role !== "admin" && (
                <li className="nav-item">
                  <Link to={user ? "/payable" : "/login"} className="nav-link">
                    Payable
                  </Link>
                </li>
              )} */}

              {/* {user?.role !== "admin" && (
                <li className="nav-item">
                  <Link
                    to={user ? "/receivables" : "/login"}
                    className="nav-link"
                  >
                    Receivables
                  </Link>
                </li>
              )} */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </Link>
                <div className="dropdown-menu">
                  {user&&
                    <Link
                      className="dropdown-item d-block"
                      onClick={()=>handleModalShow()}
                    >
                      {user.username}
                    </Link>
                  }
                  {!user && (
                    <Link to={"/login"} className="dropdown-item">
                      Login
                    </Link>
                  )}
                  {!user && (
                    <Link to={"/signup"} className="dropdown-item">
                      signup
                    </Link>
                  )}
                  <div className="dropdown-divider"></div>
                  {user && (
                    <Link onClick={handleSession} className="dropdown-item">
                      Logout
                    </Link>
                  )}
                </div>
              </li>
            </ul>
            {user?.role === "user" && (
              <h3 className="text-white mx-4 d-none d-md-block">
                welcome{" "}
                <span className="fw-bold text-info">
                  {user ? user.username : "guest"}
                </span>
              </h3>
            )}
            {/* <div
          className="btn-group ms-auto me-3"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            autoComplete="off"
            checked={selectedMode === "btnradio1"}
            onChange={() => {
              setSelectedMode("btnradio1");
              toggleTheme("btnradio1");
            }}
          />
          <label
            className="btn btn-outline-primary text-center h-75"
            htmlFor="btnradio1"
          >
            Light
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            autoComplete="off"
            checked={selectedMode === "btnradio2"}
            onChange={() => {
              setSelectedMode("btnradio2");
              toggleTheme("btnradio2");
            }}
          />
          <label
            className="btn btn-outline-primary text-center h-75"
            htmlFor="btnradio2"
          >
            Dark
          </label>
        </div> */}
          </div>
        </div>
      </nav>
      <UpdateUserModal
        userData={user}
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        onConfirm={handleUpdateUser}
        setPassword={setPassword}
        setUsername={setUsername}
      />
    </div>
  );
};

export default Header;
