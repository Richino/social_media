import "dotenv/config";
import mongoose from "mongoose";

const connectDB = async () => {
	await mongoose.connect(process.env["MONGODB_URI"])
	mongoose.set("strictQuery", false);
	const db = mongoose.connection;
	return db;
};

export default connectDB;
