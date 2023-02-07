var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
const router = Router();
import { User } from "../models/model.js";
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, fullname, email, confirm_password } = req.body;
    const user = new User({
        username,
        password,
        fullname,
        email,
    });
    user.save((err, user) => {
        if (err) {
            let key = "";
            console.log("User exist");
        }
    });
}));
export default router;
//# sourceMappingURL=register.js.map