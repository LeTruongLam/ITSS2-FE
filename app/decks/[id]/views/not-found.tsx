import React from "react";

const NotFound = () => {
  const containerStyle = {
    fontFamily:
      'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    height: "100vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const headingStyle = {
    display: "inline-block",
    margin: "0px 20px 0px 0px",
    padding: "0px 23px 0px 0px",
    fontSize: "24px",
    fontWeight: 500,
    verticalAlign: "top",
    lineHeight: "49px",
    borderRight: "1px solid rgba(0, 0, 0, 0.3)",
  };

  const messageStyle = {
    display: "inline-block",
  };

  return (
    <div style={containerStyle}>
      <div>
        <div style={messageStyle}>
          <h2
            className="text-2xl"
            style={{
              fontWeight: 400,
              margin: "0px",
            }}
          >
            No cards data.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
