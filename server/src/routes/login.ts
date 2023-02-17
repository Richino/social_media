import { Router, Request, Response } from "express";
import connectDB from "../config/mongodb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const router = Router();

router.post("/", async (req: Request, res: Response) => {
	let { email, password } = req.body;
	if (!password.length && !email.length)
		return res
			.status(400)
			.send("Email and Password fields cannot be empty");
	if (!email.length)
		return res.status(400).send("Email field cannot be empty");
	if (!password.length)
		return res.status(400).send("Password field cannot be empty");

	const client = await connectDB();
	const user = await client
		.collection("users")
		.findOne({ email: email.toLowerCase() });
	if (!user) return res.status(400).send("Email or password is incorrect");
	const match = await bcrypt.compare(password, user["password"]);
	if (!match) res.status(400).send("Email or password is incorrect");
	const token = jwt.sign({ id: user._id }, process.env["SECRET"], {
		expiresIn: "5h",
	});
	res.cookie("auth", token, {
		httpOnly: true,
		sameSite: "strict",
		maxAge: 5 * 60 * 60 * 1000,
	});
	//close database
	client.close();
	return res.status(200).send("User logged in");
});

export default router;
