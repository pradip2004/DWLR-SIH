import express, { Request, Response, NextFunction } from "express";
import passport from "../config/passportConfig";
import { generateToken } from "../utils/jwtUtils";
import { signin, signup } from "../controllers/authControllers";

const router = express.Router();

router.post("/signup", signup); // regular signup route
router.post("/signin", signin); // regular signin route

// Google OAuth routes
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

      // return res.status(200).json({
      //   message: "Login successful",
      //   user,
      //   token, // Send token as a response
      // });
      return res.redirect(`http://localhost:5173/dashboard?token=${token}`);
    })(req, res, next);
  }
);

export default router;
