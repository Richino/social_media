import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = Router();
import { User } from "../models/model.js";
import connectDB from "../config/mongodb.js";
const saltRounds = 10;

function validateEmail(email: string) {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
}

router.post("/", async (req: Request, res: Response) => {
	let { username, password, fullname, email, confirm_password } = req.body;
	/*Client side validation*/
	//username
	if (username.length < 5) return res.status(400).send("Username too short (5 character or more)");
	if (username.length > 256) return res.status(400).send("Username too long (255 character or less)");

	//fullname
	if (fullname.length < 5) return res.status(400).send("Fullname too short");
	if (fullname.length > 256) return res.status(400).send("Fullname too long");

	//email
	if (!validateEmail(email)) return res.status(400).send("Email is invalid");
	//password
	if (password.length < 7) return res.status(400).send("Password is too weak");
	if (password !== confirm_password) return res.status(400).send("Password do not match");

	/*Database validation*/
	const client = await connectDB();

	//check if username exist
	const username_exist = await client.collection("Users").findOne({ username: username.toLowerCase() });
	if (username_exist) return res.status(400).send("Username is already taken");

	//check if email exist
	const email_exist = await client.collection("Users").findOne({ email: email.toLowerCase() });
	if (email_exist) return res.status(400).send("Email is already taken");

	//making username and email lowercase
	username = username.toLowerCase();
	email = email.toLowerCase();

	//encrypt password
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);

	const user = new User({
		username,
		password: hash,
		fullname,
		email,
	});

	user.save((err,user) => {
		if (err) return res.status(400).send("User already exist");
		return res.status(201).send("User created");
	});
});

export default router;
