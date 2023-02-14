import { ref, uploadBytes, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase.js";
import { Router, Request, Response } from "express";
import connectDB from "../config/mongodb.js";
import { v4 as uuidv4 } from "uuid";
import { IRequest } from "../interfaces";
import auth from "../auth/index.js";
import "dotenv/config";
import multer from "multer";
import { Post } from "../models/model.js";
const router = Router();
const upload = multer();

router.post("/upload", auth, upload.any(), async (req: IRequest, res: Response) => {
	const caption = req.body.caption;
	const author = req.user.id;
	console.log(caption, author);

	const client = await connectDB();

	const metadata = {
		contentType: "image/jpeg",
	};
	const storageRef = ref(storage, `${author}/${uuidv4()}`);
	const bytes = new Uint8Array(req.files[0].buffer);
	uploadBytes(storageRef, bytes, metadata)
		.then(async (data) => {
			const imageUrl = await getDownloadURL(ref(storage, data.metadata.fullPath));
			const post = new Post({
				author,
				caption,
				imageUrl,
			});

			post.save((err, post) => {
				if (err) {
					console.log(err);
				}
				return res.status(200).json(post);
			});
		})
		.catch((err) => {
			if (err) res.status(500).send("Image failed to upload");
		});
});

export default router;
