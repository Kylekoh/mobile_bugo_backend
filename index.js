const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");

const authRouter = require("./router/auth");
const passportSetup = require("./passport");
const passport = require("passport");

const port = process.env.PORT || 5000;

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["kylelel"],
    maxAge: 72 * 60 * 60 * 1000, // 72 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Connect to database
connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRouter);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server runnning on port ${port}`));
