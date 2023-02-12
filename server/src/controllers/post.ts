import { ref, uploadBytes, uploadString } from "firebase/storage";
import { storage } from "../config/firebase.js";
import { Router, Request, Response } from "express";
import connectDB from "../config/mongodb.js";
import { v4 as uuidv4 } from "uuid";
import { IRequest } from "../interfaces";
import auth from "../auth/index.js";
import "dotenv/config";
import multer from "multer";
const router = Router();
const upload = multer();

router.post("/upload", auth, upload.any(), async (req: IRequest, res: Response) => {
    const caption = req.body.text
	/*const user = req.user;
	const metadata = {
		contentType: "image/jpeg",
	};
	const storageRef = ref(storage, `${user.id}/${uuidv4()}`);
	const bytes = new Uint8Array(req.file.buffer);
	uploadBytes(storageRef, bytes, metadata)
		.then(() => {
			console.log("Uploaded an array!");
		})
		.catch((err) => {
			if (err) console.log(err);
		});
	return;*/
});

export default router;
