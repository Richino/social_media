import { Router, Request, Response } from "express";
const router = Router();

router.post("/login", (req: Request, res: Response) => {
	const { username, password } = req.body;
});
