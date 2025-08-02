import React from "react";

const UpdateUserModal = ({userData,show, onClose, onConfirm ,setPassword,setUsername}) => {
    console.log('userData',userData);
    
  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User Data</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div><label htmlFor="">username : </label> <span className="fw-bold">{userData?.username}</span></div>
            <div><label htmlFor="">userId : </label> <span className="fw-bold">{userData?.id}</span></div>
            <div><label htmlFor="">role : </label> <span className="fw-bold">{userData?.role}</span></div>
            <div>
            <label htmlFor="">Password (encrypted) : </label>
            <span className="fw-bold">{userData?.password.slice(0,25)}</span>
            </div>
          </div>
          <div className="modal-footer">
            {/* <button className="btn btn-danger" onClick={onClose}> */}
              {/* Cancel */}
            {/* </button> */}
            <button className="btn btn-success" onClick={onClose}>
              ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
