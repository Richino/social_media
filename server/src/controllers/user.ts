import { Router, Request, Response } from "express";
import { IRequest } from "../interfaces/index.js";
import connectDB from "../config/mongodb.js";
import "dotenv/config";
import { ObjectId } from "mongodb";
import { Notification, Comment } from "../models/model.js";
import auth from "../auth/index.js";
const router = Router();

router.post("/follow/:id", auth, async (req: IRequest, res: Response) => {
	const { id } = req.params;
	const follower = req.body["user"];
	const client = await connectDB();
	const session = client.startSession();
	(await session).startTransaction();
	try {
		const user = await client.collection("users").findOne({ _id: new ObjectId(req.user.id) });
		if (!user["following"].includes(id)) {
			if (id != follower) {
				client
					.collection("notifications")
					.find({ author: new ObjectId(id), user: new ObjectId(follower) })
					.toArray()
					.then((res) => {
						if (res.length >= 1) return;
						const notification = new Notification({
							author: new ObjectId(id),
							user: new ObjectId(follower),
							action: "follow",
						});
						notification.save();
					});
			}
			await client
				.collection("users")
				.updateOne({ _id: new ObjectId(req.user.id) }, { $push: { following: id } });
			await client
				.collection("users")
				.updateOne({ _id: new ObjectId(id) }, { $push: { followers: req.user.id } });
			return res.status(200).json(true);
		} else {
			await client
				.collection("users")
				.updateOne({ _id: new ObjectId(req.user.id) }, { $pull: { following: id } });
			await client
				.collection("users")
				.updateOne({ _id: new ObjectId(id) }, { $pull: { followers: req.user.id } });
			return res.status(200).json(true);
		}
	} catch (error) {
		(await session).abortTransaction();
	} finally {
		(await session).endSession();
	}
});

router.post("/like/:id", auth, async (req: IRequest, res: Response) => {
	console.log("here");
	const { id } = req.params;
	const { user, author } = req.body;
	const client = await connectDB();
	const session = client.startSession();
	(await session).startTransaction();
	try {
		const post = await client.collection("posts").findOne({ _id: new ObjectId(id) });

		if (!post["likes"].includes(req.user.id)) {
			await client.collection("posts").updateOne({ _id: new ObjectId(id) }, { $push: { likes: req.user.id } });
			if (user != author) {
				client
					.collection("notifications")
					.find({ post: new ObjectId(id), user })
					.toArray()
					.then((res) => {
						if (res.length >= 1) return;
						const notification = new Notification({
							author: new ObjectId(author),
							post: new ObjectId(id),
							user: new ObjectId(user),
							action: "like",
						});
						notification.save();
					});
			}
			return res.status(200).json(true);
		} else {
			await client.collection("posts").updateOne({ _id: new ObjectId(id) }, { $pull: { likes: req.user.id } });
			return res.status(200).json(true);
		}
	} catch (error) {
		(await session).abortTransaction();
		console.log(error); //
	} finally {
		(await session).endSession();
	}
});

router.post("/comment/:id", auth, async (req: IRequest, res: Response) => {
	console.log("here");
	const author = req.params["id"];
	const { post } = req.body;
	console.log(`author: ${author} -> post: ${post}`);
	const client = await connectDB();
	const session = client.startSession();
	(await session).startTransaction();
	try {
		const comment = new Comment({
			post: post,
			author: author,
			text: "test",
		});

		comment.save();
	} catch (error) {
		(await session).abortTransaction();
		console.log(error);
	} finally {
		(await session).endSession();
	}
});

export default router;
