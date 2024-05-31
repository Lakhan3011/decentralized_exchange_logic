import express from "express";

const app = express();

let ETH_BALANCE = 200;
let USDC_BALANCE = 75000;

app.post("./buy-asset", (req, res) => {
  const quantity = req.body.quantity;
  const updatedEthBalance = ETH_BALANCE - quantity;
  const updatedUsdcBalance = (ETH_BALANCE * USDC_BALANCE) / updatedEthBalance;
  const paidAmount = updatedUsdcBalance - USDC_BALANCE;

  ETH_BALANCE = updatedEthBalance;
  USDC_BALANCE = updatedUsdcBalance;

  res.json({
    message: `You paid ${paidAmount} USDC for ${quantity} ETH`,
  });
});

app.post("./sell-asset", (req, res) => {
  const quantity = req.body.quantity;
  const updatedEthBalance = ETH_BALANCE + quantity;
  const updatedUsdcBalance = (ETH_BALANCE * USDC_BALANCE) / updatedEthBalance;
  const gottenUSDC = updatedUsdcBalance - USDC_BALANCE;

  ETH_BALANCE = updatedEthBalance;
  USDC_BALANCE = updatedUsdcBalance;

  res.json({
    message: `You gotten ${gottenUSDC} USDC for ${quantity} ETH`,
  });
});

app.listen(3000);
