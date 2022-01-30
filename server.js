// express setup
const express = require("express");

const app = express();
var PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Página inicial");
});

// Listen
app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
