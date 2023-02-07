import jwt from "jsonwebtoken";
const secret = process.env["SECRET"];
export default function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send('Unauthorized');
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).send('Unauthorized');
    }
}
//# sourceMappingURL=index.js.map