import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IRequest } from "../interfaces";
const secret = process.env["SECRET"];

export default function auth(req: IRequest, res: Response, next: NextFunction) {
	const auth = req.cookies.auth;
	if (!auth) return res.status(401).send("Unauthorized");
	const token = jwt.verify(auth, secret);
	req.user = token;
	next();
}
