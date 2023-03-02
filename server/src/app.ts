import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import main from "./routes/main.js";
import register from "./routes/register.js";
import login from "./routes/login.js";
import user from "./routes/user.js";
import user_controller from "./controllers/user.js";
import post from "./controllers/post.js";
import search from "./controllers/search.js";
import feeds from "./controllers/feeds.js";
import "dotenv/config";
const app = express();
const PORT = 4000;
const corsOptions = {
	origin: process.env["URL2"],
	credentials: true,
	optionSuccessStatus: 200,
};

//config
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/app", main);
app.use("/register", register);
app.use("/login", login);
app.use("/user", user);

//controllers//
app.use("/image", post);
app.use("/search", search);
app.use("/main_user", user_controller);
app.use("/feeds", feeds);

//app.listen(PORT, process.env["IP"], () => console.log("server started "));
app.listen(PORT, () => console.log("server started "));
