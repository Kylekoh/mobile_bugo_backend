const express = require("express");
const passport = require("passport");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: fail,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/",
  })
);

// router.get("/kakao/auth", async (req, res, next) => {
//   let code = req.query.code;
//   console.log("코드는?", code);
//   // const payload = qs.stringify({
//   //   grant_type: "authorization_code",
//   //   client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
//   //   redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
//   //   code: code,
//   //   client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
//   // });
//   // try {
//   //   const res = await axios.post(
//   //     "https://kauth.kakao.com/oauth/token",
//   //     payload,
//   //     {
//   //       headers: {
//   //         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
//   //       },
//   //     }
//   //   );
//   //   console.log("응답 결과는?", res);
//   // } catch (err) {
//   //   console.log("통신에로는?", err);
//   // }

//   const access_token =
//     "K4zUkuBy3OqDSrGXEDcAS6Bgg2cXOK3gU0wHAr96Cilv1QAAAYKRLBWi";
//   let user;
//   try {
//     console.log("엑세스 토큰은?", access_token);
//     user = await axios.get("https://kapi.kakao.com/v2/user/me", {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
//       },
//     });
//   } catch (e) {
//     res.json(e.data);
//   }

//   console.log("유저 결과물은?", user);
// });

module.exports = router;
