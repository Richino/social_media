import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import main from "./routes/main.js";
import register from "./routes/register.js";
import login from "./routes/login.js";
import user from "./routes/user.js";
const app = express();
const PORT = 4000;
const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/app", main);
app.use("/register", register);
app.use("/login", login);
app.use("/user", user);

app.listen(PORT, () => console.log("server started "));
