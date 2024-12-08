import { Request, Response } from "express";
import Authority from "../model/Authority";

export const addAuthorityUser = async (req: Request, res: Response) => {
      const { email, phone } = req.body;
    
      try {
        const newAuthority = new Authority({ email, phone });
        await newAuthority.save();
        res.status(201).json({ message: 'User added successfully', data: newAuthority });
      } catch (error: any) {
        res.status(400).json({ message: 'Error adding user', error: error.message });
      }
}

export const showAuthorityUser =  async (req: Request, res: Response) => {
      try {
            const users = await Authority.find({});
            res.status(200).json({ data: users });
          } catch (error: any) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
          }
}