import { Router, Request, Response } from "express";
const router = Router();
import { User } from "../models/model.js";

router.post("/", async (req: Request, res: Response) => {
	const { username, password, fullname, email, confirm_password } = req.body;

	const user = new User({
		username,
		password,
		fullname,
		email,
	});

	user.save((err: any, user) => {
        
		if (err) {
            let key = ""
			console.log("User exist");
		}
	});
});

export default router;
