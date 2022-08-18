const KakaoStrategy = require("passport-kakao").Strategy;
const passport = require("passport");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

const {
  NEXT_PUBLIC_KAKAO_REST_API_KEY,
  NEXT_PUBLIC_REDIRECT_URI,
  NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
  JWT_SECRET,
} = process.env;

passport.use(
  new KakaoStrategy(
    {
      clientID: NEXT_PUBLIC_KAKAO_REST_API_KEY,
      clientSecret: NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
      callbackURL: NEXT_PUBLIC_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const exUser = await User.findOne({ snsId: profile.id });

        if (exUser) {
          // 이미 존재하는 유저
          //   const token = await jwt.sign(
          //     {
          //       id: exUser._id,
          //       created: Date.now().toString(),
          //     },
          //     JWT_SECRET
          //   );
          //   exUser.tokens.push(token);
          //   await exUser.save();
          //   done(null, exUser, { mesaage: "Auth Successful", token });
          done(null, exUser);
          done(null, exUser, { mesaage: "Auth Successful" });
        } else {
          // 새로운 유저
          const newUser = await User.create({
            snsId: profile.id,
            email: profile._json && profile._json.kakao_account.email,
            nickName: profile.username,
            avatarUrl: profile._json && profile._json.properties.profile_image,
            ageRange: profile._json && profile._json.kakao_account.age_range,
            provider: "kakao",
          });
          //   const token = await jwt.sign(
          //     {
          //       id: newUser._id,
          //       created: Date.now().toString(),
          //     },
          //     JWT_SECRET
          //   );
          //   newUser.tokens.push(token);
          //   await newUser.save();
          //   done(null, newUser, { mesaage: "Auth Successful", token });
          done(null, newUser, { mesaage: "Auth Successful" });
        }
      } catch (error) {
        console.log(error);
        done(error, false, { mesaage: "Internal server error" });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
