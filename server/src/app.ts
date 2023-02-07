import express from "express";
import cors from "cors";
import main from "./routes/main.js";
import register from "./routes/register.js";
const app = express();
const PORT = 4000;
const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true, 
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/app", main);
app.use("/register", register);


app.listen(PORT, () => console.log("server started "));
