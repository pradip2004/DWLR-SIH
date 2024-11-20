import express, { Request, Response } from "express";
import { signup, signin } from "../controllers/authControllers";
import passport from "../config/passportConfig";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get(
      "/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );
    router.get(
      "/google/callback",
      passport.authenticate("google", { failureRedirect: "/signin" }),
      (req: Request, res: Response) => {
        res.status(200).json({
          message: "Login successful",
          user: req.user,
        });
      }
    );

export default router;
