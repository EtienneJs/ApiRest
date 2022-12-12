import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import authRouter from "./routers/auth.route.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", authRouter);
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("puerto http://localhost:" + PORT));
