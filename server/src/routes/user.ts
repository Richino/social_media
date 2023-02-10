import { Router, Request, Response } from "express";
import connectDB from "../config/mongodb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const router = Router();

router.post("/:username", async (req: Request, res: Response) => {
	const username = req.params["username"];
	const client = await connectDB();
	let user = await client.collection("users").findOne({ username: username.toLowerCase() });
	console.log(user);
});

export default router;
