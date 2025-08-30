const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from backend!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
