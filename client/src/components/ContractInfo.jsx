import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { getContractBalanceInETH } from "../utils/contractServices";

function ContractInfo({ account }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const balanceInETH = await getContractBalanceInETH();
      setBalance(balanceInETH);
    };
    fetchBalance();
  }, []);

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6">Contract Balance: {balance} ETH</Typography>
      <Typography variant="body1">Connected Account: {account}</Typography>
    </Box>
  );
}

export default ContractInfo;