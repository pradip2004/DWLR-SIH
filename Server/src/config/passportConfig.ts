import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../model/User"; // Replace with your User model path
import dotenv from 'dotenv';
dotenv.config();

console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);  // Check this value
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);  // Check this value
passport.use(
      new GoogleStrategy(
            {
                  clientID: process.env.GOOGLE_CLIENT_ID || '',  
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',  
                  callbackURL: '/api/auth/google/callback',  
            },
            async (accessToken, refreshToken, profile, done) => {
                  try {

                        let user = await User.findOne({ googleId: profile.id });

                        if (!user) {

                              user = await User.create({
                                    googleId: profile.id,
                                    name: profile.displayName,
                                    email: profile.emails?.[0]?.value,
                              });
                        }

                        done(null, user);
                  } catch (err) {
                        done(err, false);
                  }
            }
      )
);

passport.serializeUser((user: any, done: Function) => {
      done(null, user.id);
});


passport.deserializeUser(async (id: string, done: Function) => {
      try {
            const user = await User.findById(id);
            done(null, user);
      } catch (err) {
            done(err, null);
      }
});

export default passport
