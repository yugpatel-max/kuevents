const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const registerRoutes = require("./routes/register");
const newsletterRoutes = require("./routes/newsletter");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/newsletter", newsletterRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});