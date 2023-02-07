import mongoose from "mongoose";
//production code
const user = new mongoose.Schema({
	fullname: { type: String, required: true, max: 25, min: 5 },
	username: { type: String, required: true, unique: true, max: 25, min: 5 },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	bio: { type: String },
	followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
	following: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
	avatar: { type: String },
	createdAt: { type: Date, default: Date.now },
});

const post = new mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
	caption: { type: String, required: true },
	imageUrl: { type: String, required: true },
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
	comments: [
		{
			author: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
			text: { type: String, required: true },
			createdAt: { type: Date, default: Date.now },
		},
	],
	createdAt: { type: Date, default: Date.now },
});

export const Post = mongoose.model<mongoose.Document>("posts", post);
export const User = mongoose.model<mongoose.Document>("users", user);
