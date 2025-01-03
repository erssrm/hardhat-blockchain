import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { depositFund, withdrawFund } from "../utils/contractServices";
import { toast } from "react-toastify";

function ContractActions() {
  const [depositValue, setDepositValue] = useState("");

  const handleDeposit = async () => {
    try {
      await depositFund(depositValue);
      toast.success("Deposit successful!");
    } catch (error) {
      toast.error(error?.reason);
    }
    setDepositValue("");
  };

  const handleWithdraw = async () => {
    try {
      await withdrawFund();
      toast.success("Withdrawal successful!");
    } catch (error) {
      toast.error(error?.reason);
    }
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6">Contract Actions</Typography>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Amount in ETH"
          variant="outlined"
          fullWidth
          value={depositValue}
          onChange={(e) => setDepositValue(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleDeposit}>
          Deposit Funds
        </Button>
      </Box>
      <Button variant="contained" color="secondary" onClick={handleWithdraw}>
        Withdraw Funds
      </Button>
    </Box>
  );
}

export default ContractActions;