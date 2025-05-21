import express from "express"
import cors from "cors"
import Route from "./route/Route.js"
import UserRoute from "./route/UserRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cookieParser());
app.set("view engine", "ejs");

app.use(cors())
app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);
app.use(Route)

app.listen(5000, ()=> {
    console.log("server is running");
});
