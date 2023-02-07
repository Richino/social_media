import { Router } from "express";
import auth from "../auth/index.js";
const router = Router();
router.get("/", auth, (req, res) => {
    console.log("Hello");
    return res.json("Hello");
});
export default router;
//# sourceMappingURL=main.js.map