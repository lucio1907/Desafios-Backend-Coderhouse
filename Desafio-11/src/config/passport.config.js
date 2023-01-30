import passport from "passport";
import local from "passport-local";
import userModel from "../models/user.model.js";
import { hashPassword, isValid } from "../utils/bcrypt.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        try {
          const user = await userModel.findOne({ username });
          if (user) return done(null, false);
          const newUser = {
            username,
            password: hashPassword(password),
            email: req.body.email,
          };

          try {
            const result = await userModel.create(newUser);
            return done(null, result);
          } catch (error) {
            done(error);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    userModel.findById(id, done);
  });

  passport.use(
    "login",
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await userModel.findOne({ username });
        if (!user) return done(null, false);
        if (!isValid(user, password)) return done(null, false);
        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );
};

export default initializePassport;
