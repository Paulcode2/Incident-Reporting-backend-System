require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");

app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
