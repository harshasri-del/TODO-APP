const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const { swaggerUi, swaggerSpec } = require("./swagger");
const path = require("path");

connectDB();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// API routes
app.use("/api", userRoutes);
app.use("/api", todoRoutes);

const PORT = process.env.PORT;

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
