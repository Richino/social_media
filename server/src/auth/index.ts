import express,{ Router,Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
const secret = process.env["SECRET"]

interface IRequest extends express.Request {
    user?: any;
  }

export default function auth(req:IRequest,res:Response,next:NextFunction){

    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send('Unauthorized')
  
    const token = authHeader.split(' ')[1];
   
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).send('Unauthorized');
    }
}