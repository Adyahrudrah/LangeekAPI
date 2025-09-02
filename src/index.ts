import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Dictionary API proxy endpoint
app.get("/api/dictionary", async (req, res) => {
  try {
    const { term } = req.query;

    if (!term) {
      return res.status(400).json({ error: "Term parameter is required" });
    }

    const response = await axios.get(
      `https://api.langeek.co/v1/cs/en/word/?term=${term}&filter=,inCategory,photo,withExamples`
    );

    console.log("API Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "Failed to fetch data from external API" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
