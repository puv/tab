const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const db = require("./database/database");
const Routes = require("./routes/_routes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

db.init().then(async () => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("trust proxy", true);

// app.use(flash());

app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: false
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use('/gridstack', express.static(path.join(__dirname, "../node_modules/gridstack")));

// Middleware Routes
app.use("/", Routes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});