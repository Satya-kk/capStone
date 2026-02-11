import React, { useState } from "react";
import axios from "axios";

function App() {
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const features = new Array(28).fill(0); // 28 dummy features

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        Time: parseFloat(time),
        Amount: parseFloat(amount),
        Features: features
      });

      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to backend");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Credit Card Fraud Detection</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="number"
            placeholder="Enter Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Predict</button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>
            Prediction:{" "}
            {result.prediction === 1 ? "Fraud 🚨" : "Not Fraud ✅"}
          </h3>
          <p>Fraud Probability: {result.probability.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
