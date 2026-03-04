import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//dotenv config
dotenv.config();

//app initialization
const app = express();

//default middleware
app.use(express.json());

//3rd parties middleware
app.use(cors());

//default routes
app.get("/", (req, res) => {
  res.send("Welcome to Lax 360 Backend");
});

//port initialization
const port = process.env.PORT || 5000;

//server listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

