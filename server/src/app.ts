import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {});

app.listen(4000, () => console.log("server started"));
