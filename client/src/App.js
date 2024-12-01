import abi from "./contract/chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import chai from "./Boba.png";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x366138c43881d52b0202969a8c539f00d125f758";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install MetaMask.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <div style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <nav
        style={{
          backgroundColor: "#1A202C",
          color: "#fff",
          padding: "10px 20px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}>EtherBoba</h1>
      </nav>

      {/* Hero Section */}
      <div style={{ textAlign: "center", padding: "20px" }}>
        <img
          src={chai}
          alt="EtherBoba"
          style={{
            maxWidth: "300px",
            width: "100%",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
        <p
          style={{
            fontSize: "1.2rem",
            marginTop: "10px",
            color: "#4A5568",
            fontWeight: "bold",
          }}
        >
          Connected Account:{" "}
          <span style={{ color: "#2D3748" }}>{account}</span>
        </p>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "800px",
          margin: "20px auto",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <Buy state={state} />
        <hr style={{ margin: "20px 0", borderColor: "#E2E8F0" }} />
        <Memos state={state} />
      </div>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "10px 0",
          backgroundColor: "#1A202C",
          color: "#fff",
          marginTop: "20px",
        }}
      >
        <p style={{ margin: 0 }}>© 2024 EtherBoba. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
