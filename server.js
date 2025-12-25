const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Shop4Pi backend running ✅");
});
const PORT = process.env.PORT || 3314;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
