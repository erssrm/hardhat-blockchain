import React, { useState, useEffect } from "react";
import { Container, CssBaseline, Typography, Box, Paper } from "@mui/material";
import ConnectWalletButton from "./components/ConnectWalletButton";
import ContractInfo from "./components/ContractInfo";
import ContractActions from "./components/ContractActions";
import { requestAccount } from "./utils/contractServices";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchCurAccount = async () => {
      const account = await requestAccount();
      setAccount(account);
    };
    fetchCurAccount();
  }, []);

  useEffect(() => {
    const handleAccountChanged = (newAccounts) =>
      setAccount(newAccounts.length > 0 ? newAccounts[0] : null);
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
    }
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChanged);
    };
  });

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Blockchain DApp
        </Typography>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2, width: "100%" }}>
          {!account ? (
            <ConnectWalletButton setAccount={setAccount} />
          ) : (
            <div className="contract-interactions">
              <ContractInfo account={account} />
              <ContractActions />
            </div>
          )}
        </Paper>
      </Box>
      <ToastContainer />
    </Container>
  );
}

export default App;