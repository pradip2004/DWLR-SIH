import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "Rajanya";

export const generateToken = (payload: object): string =>{
      return jwt.sign(payload, JWT_SECRET);
}
