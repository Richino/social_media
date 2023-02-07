import "dotenv/config";
import mongoose from "mongoose";
const connectDB = () => {
    mongoose.connect(process.env["MONGODB_URI"]).then(() => console.log("mongoose"));
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => console.log("Connected to MongoDB!"));
};
export default connectDB;
//# sourceMappingURL=mongodb.js.map