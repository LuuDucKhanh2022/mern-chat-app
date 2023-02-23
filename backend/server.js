const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDatabase = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const app = express();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./backend/.env" });
}

console.log(process.env.PORT);

connectDatabase();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log("server is starting on port 5000!");
});
