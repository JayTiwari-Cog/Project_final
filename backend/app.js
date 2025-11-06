import express from "express";
import dotenv from "dotenv";
import routes from "./routes/userRoute.js";
import passport from "passport";
import cors from "cors";
import hotel from "./routes/hotelRoute.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
}));
app.use(passport.initialize());
app.use("/api",routes);


app.use('/api',hotel)

export default app;