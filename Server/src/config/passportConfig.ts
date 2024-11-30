import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from 'dotenv';
import { OauthUser } from "../model/User";

dotenv.config();

console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);  // Check this value
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);  // Check this value

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/api/auth/google/callback', // Redirect URI after authentication
      scope: ['profile', 'email'],  // Required parameters
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.id) {
          return done(new Error('Google ID not found'), false);
        }

        let user = await OauthUser.findOne({ googleId: profile.id });

        if (!user) {
          user = await OauthUser.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value || null,  // Ensure email is passed
          });
        }

        done(null, user); // Pass the OAuth user to the next middleware
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser((user: any, done: Function) => {
  done(null, user.id); // Serialize the OAuth user ID
});

passport.deserializeUser(async (id: string, done: Function) => {
  try {
    const user = await OauthUser.findById(id); // Find the user in the OAuth collection
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
