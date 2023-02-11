import express, { Router, Request, Response, NextFunction } from "express";
import auth from "../auth/index.js";
import { IRequest } from "../interfaces/index.js";
import connectDB from "../config/mongodb.js";
const router = Router();

router.get("/", auth, async (req: IRequest, res: Response) => {
	const user = req.user;
	console.log("here");
	//const client = await connectDB();
    //show followers post here
	res.json(user);
});

export default router;
