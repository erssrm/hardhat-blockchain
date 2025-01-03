import React from "react";
import { Button } from "@mui/material";
import { requestAccount } from "../utils/contractServices";

function ConnectWalletButton({ setAccount }) {
  const connectWallet = async () => {
    try {
      const account = await requestAccount();
      setAccount(account);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={connectWallet}>
      Connect Web3 Wallet
    </Button>
  );
}

export default ConnectWalletButton;