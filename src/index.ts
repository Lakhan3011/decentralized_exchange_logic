import express from "express";

const app = express();

app.use(express.json());

let ETH_BALANCE = 200;
let USDC_BALANCE = 740000;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to dex",
  });
});

app.post("/buy-asset", (req, res) => {
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

app.post("/sell-asset", (req, res) => {
  const quantity = req.body.quantity;
  const updatedEthBalance = ETH_BALANCE + quantity;
  const updatedUsdcBalance = (ETH_BALANCE * USDC_BALANCE) / updatedEthBalance;
  const gottenUSDC = USDC_BALANCE - updatedUsdcBalance;

  ETH_BALANCE = updatedEthBalance;
  USDC_BALANCE = updatedUsdcBalance;

  res.json({
    message: `You have gotten ${gottenUSDC} USDC for ${quantity} ETH`,
  });
});

app.listen(3000);
