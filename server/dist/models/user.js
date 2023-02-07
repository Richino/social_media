import mongoose from "mongoose";
const user = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, required: false },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now },
});
export const User = mongoose.model("Users", user);
//# sourceMappingURL=user.js.map