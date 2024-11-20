import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { User } from "../model/User";
import { generateToken } from "../utils/jwtUtils";

export const signup = async (req: Request, res: Response): Promise<any> => {
      const { name, email, password } = req.body;
      console.log(req.body);
      try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                  return res.status(400).json({ error: "User already exists" });
            }


            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({ name, email, password: hashedPassword });
            console.log(newUser)

            res.status(200).json({ message: "User Registered Successfully" })
      } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
      }
}

export const signin = async (req: Request, res: Response): Promise<any> => {
      const { email, password } = req.body;

      try {
            const user = await User.findOne({ email });
            if (!user || !user.password) {
                  return res.status(400).json({ error: "Invalid Email or Password" });
            }


            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                  return res.status(400).json({ error: "Invalid Email or Password" });
            }

            const token = generateToken({ id: user._id });

            res.status(200).json({ token });
      } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
      }
}


