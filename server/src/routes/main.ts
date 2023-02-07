import express, { Router, Request, Response, NextFunction } from "express";
import auth from "../auth/index.js";
const router = Router();

router.get("/", auth, (req: Request, res: Response) => {
	console.log("Hello");
	return res.json("Hello");
});

export default router;
