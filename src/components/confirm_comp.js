import React from "react";

export default function ConfirmComp({title="Hata", message="", onCancel=()=>{}, onConfirm=()=>{}}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex:100
      }}
    >
      <div
        style={{
          width: "40%",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">{title}</h1>
        <p className="text-center">{message}</p>
        <div className="btn-group d-flex ">
            <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
            <button onClick={onConfirm} className="btn btn-danger">Confirm</button>
        </div>
      </div>
    </div>
  );
}
