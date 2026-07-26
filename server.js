const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Chand App API is running!"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Chand App API"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Chand App API running on port ${PORT}`);
});
