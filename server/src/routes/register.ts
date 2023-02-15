import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { storage } from "../config/firebase.js";
import { ref, getDownloadURL } from "firebase/storage";
import { User } from "../models/model.js";
import connectDB from "../config/mongodb.js";
import "dotenv/config";

const router = Router();
const saltRounds = 10;

function validateEmail(email: string) {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
}

function validateUsername(username: string) {
	const pattern = /^[a-zA-Z0-9]+$/;
	return pattern.test(username);
}

router.post("/", async (req: Request, res: Response) => {
	let { username, password, fullname, email, confirm_password } = req.body;
	/*Client side validation*/
	//username
	username = username.trim();
	console.log(username);
	if (username.length < 5) return res.status(400).send("Username too short (5 character or more)");
	if (username.length > 256) return res.status(400).send("Username too long (255 character or less)");
	if (username.includes(" ")) return res.status(400).send("Username can't contain spaces");
	if (!validateUsername(username)) return res.status(400).send("Username can only contain char from a-z and 1-9");

	//fullname
	if (fullname.length < 5) return res.status(400).send("Fullname too short");
	if (fullname.length > 256) return res.status(400).send("Fullname too long");

	//email
	if (!validateEmail(email)) return res.status(400).send("Email is invalid");
	//password
	if (password.length < 7) return res.status(400).send("Password is too weak");
	if (password !== confirm_password) return res.status(400).send("Password do not match");

	/*connect to database*/
	const client = await connectDB();

	//check if username exist
	const username_exist = await client.collection("users").findOne({ username: username.toLowerCase() });
	if (username_exist) return res.status(400).send("Username is already taken");

	//check if email exist
	const email_exist = await client.collection("users").findOne({ email: email.toLowerCase() });
	if (email_exist) return res.status(400).send("Email is already taken");

	//making username and email lowercase
	username = username.toLowerCase();
	email = email.toLowerCase();

	//encrypt password
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);
	const avatar = await getDownloadURL(ref(storage, "default/default.png"));
	const user = new User({
		username,
		password: hash,
		fullname,
		email,
		avatar,
	});

	//create user
	user.save((err, user) => {
		if (err) return res.status(400).send("User already exist");
		const token = jwt.sign({ id: user._id }, process.env["SECRET"], { expiresIn: "5h" });
		res.cookie("auth", token, { httpOnly: true, sameSite: "strict", maxAge: 5 * 60 * 60 * 1000 });
		//close database
		client.close();
		return res.status(200).send("User created");
	});
});

export default router;
