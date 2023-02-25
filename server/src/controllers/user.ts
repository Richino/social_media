import { Router, Request, Response } from "express";
import { IRequest } from "../interfaces/index.js";
import connectDB from "../config/mongodb.js";
import "dotenv/config";
import { ObjectId } from "mongodb";
import auth from "../auth/index.js";
const router = Router();

router.post("/follow/:id", auth, async (req: IRequest, res: Response) => {
	const { id } = req.params;
	const client = await connectDB();
	const session = client.startSession();
	(await session).startTransaction();
	try {
		const user = await client.collection("users").findOne({ _id: new ObjectId(req.user.id) });
		if (!user["following"].includes(id)) {
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

export default router;
