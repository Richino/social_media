import { Router, Request, Response } from "express";
import connectDB from "../config/mongodb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const router = Router();

router.post("/:username", async (req: Request, res: Response) => {
	const username = req.params["username"];
	const client = await connectDB();
	let user = await client
		.collection("users")
		.findOne(
			{ username: username.toLowerCase() },
			{ projection: { password: 0, __v: 0, email: 0 } }
		);
	let post = await client
		.collection("posts")
		.find({ author: user._id })
		.sort({ createdAt: -1 })
		.toArray();
	return res.status(200).json({ user, post });
});

export default router;
