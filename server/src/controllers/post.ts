import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase.js";
import { Router, Response } from "express";
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

router.post("/comments/:id", auth, async (req: IRequest, res: Response) => {
	const post = req.params["id"];
	console.log(post);
	const client = await connectDB();
	const session = client.startSession();
	(await session).startTransaction();
	try {
		const comments = await client
			.collection("posts")
			.aggregate([
				{ $match: { _id: new ObjectId(post) } },
				{
					$lookup: {
						from: "comments",
						localField: "_id",
						foreignField: "post",
						as: "comments_info",
					},
				},
				{
					$unwind: "$comments_info",
				},
				{
					$lookup: {
						from: "users",
						localField: "comments_info.author",
						foreignField: "_id",
						as: "comments_info.authorDetails",
					},
				},
				{
					$addFields: {
						"comments_info.authorDetails": {
							$arrayElemAt: ["$comments_info.authorDetails", 0],
						},
					},
				},

				{
					$project: {
						"comments_info.authorDetails.fullname": 1,
						"comments_info.authorDetails.avatar": 1,
						"comments_info.text": 1,
						"comments_info.createdAt": 1,
						createdAt: 1,
					},
				},
				{
					$sort: {
						"comments_info.createdAt": -1,
					},
				},
			])
			.toArray();
		return res.status(200).json(comments);
	} catch (error) {
		(await session).abortTransaction();
	} finally {
		(await session).endSession();
	}
});

export default router;
