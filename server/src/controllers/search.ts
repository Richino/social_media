import {
	ref,
	uploadBytes,
	uploadString,
	getDownloadURL,
} from "firebase/storage";
import { storage } from "../config/firebase.js";
import { Router, Request, Response } from "express";
import connectDB from "../config/mongodb.js";
import { v4 as uuidv4 } from "uuid";
import { IRequest } from "../interfaces";
import auth from "../auth/index.js";
import "dotenv/config";
import multer from "multer";
import { Post } from "../models/model.js";
import { ObjectId } from "mongodb";
const router = Router();
const upload = multer();

router.post("/user", auth, async (req: IRequest, res: Response) => {
	const username = req.body.username;
	const regex = new RegExp(`^${username}`, "i");

	const client = await connectDB();
	client.collection("users").createIndex({ user: 1 });
	const users = await client
		.collection("users")
		.find(
			{ username: { $regex: regex } },
			{
				projection: {
					password: 0,
					__v: 0,
					email: 0,
					followers: 0,
					following: 0,
					bio: 0,
					createdAt: 0,
				},
			}
		)
		.toArray(); //

	console.log(users);
});

export default router;
