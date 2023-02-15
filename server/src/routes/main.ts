import express, { Router, Request, Response, NextFunction } from "express";
import auth from "../auth/index.js";
import { IRequest } from "../interfaces/index.js";
import connectDB from "../config/mongodb.js";
import { ObjectId } from "mongodb";
const router = Router();

router.get("/", auth, async (req: IRequest, res: Response) => {
	const client = await connectDB();
	const user = await client.collection("users").findOne({ _id: new ObjectId(req.user.id) }, { projection: { password: 0, __v: 0 } }).catch((err) => res.status(500).send("User not found"));
	res.json(user);
});

export default router;
