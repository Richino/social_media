import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import main from "./routes/main.js";
import register from "./routes/register.js";
const app = express();
const PORT = 4000;
import connectDB from "./config/mongodb.js";
app.use(express.json());
const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
connectDB();

app.use("/app", main);
app.use("/register", register);
app.listen(PORT, () => console.log("server started "));