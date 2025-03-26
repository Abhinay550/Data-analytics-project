import React from "react";

function Logo() {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            fontFamily: "'Poppins', sans-serif",
        }}>
            <div style={{
                background: "linear-gradient(45deg, #ff6b6b, #556270)",
                padding: "15px 30px",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                fontSize: "28px",
                fontWeight: "bold",
                color: "white",
                letterSpacing: "2px"
            }}>
                ABHINAY WEB 🌐
            </div>
        </div>
    );
}

export default Logo;
