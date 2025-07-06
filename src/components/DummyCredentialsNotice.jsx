import React from "react";

const DummyCredentialsNotice = () => {
  return (
    <div
      style={{
        color: "black",
        padding: "3px 0",
        overflow: "hidden",
        top: "0",
        width: "100%",
        textAlign: "center",
      }}>
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "scroll 10s linear infinite",
        }}>
        For login or sign-up, use dummy credentials! &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default DummyCredentialsNotice;
