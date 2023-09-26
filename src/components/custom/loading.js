import React from "react";

function Loading() {
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%', width:'100%'}}>
        <h1 style={{textAlign:'center'}}>Loading....</h1>
      </div>

    </div>
  );
}

export default Loading;
