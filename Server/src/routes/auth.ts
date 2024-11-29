import express, { Request, Response, NextFunction  } from "express";
import { signup, signin } from "../controllers/authControllers";
import passport from "../config/passportConfig";
import { generateToken } from "../utils/jwtUtils";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { failureRedirect: "/signin" }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      
      const email = (user as { email?: string }).email;

      if (!email) {
        return res.status(400).json({ message: "Email not found in user data" });
      }

      const token = generateToken({ email });

      return res.status(200).json({
        message: "Login successful",
        user,
        token,
      });
    })(req, res, next);
  }
);


export default router;
