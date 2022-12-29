import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../models/User.js";

export const connectPassword = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          process.env.GOOGLE_CLIENT_ID ||
          "787118182509-9ftcaap16dsg6fione3i7bqght6e89i7.apps.googleusercontent.com",
        clientSecret:
          process.env.GOOGLE_CLIENT_SECRET ||
          "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",
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, done) {
        // database comes here
        const user = await User.findOne({
          googleId: profile.id,
        });
        if (!user) {
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
          });
          return done(null, newUser);
        } else {
          return done(null, user);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
