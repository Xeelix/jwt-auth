import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from "./router/index.js";
import errorMiddleware from "./middleware/error-middleware.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use("/api", router);
app.use(errorMiddleware);

const start = async (req, res) => {
    try {
        await mongoose.connect(process.env.DB_URL);

        app.listen(PORT, () => { console.log(`Server started at ${PORT}`) });
    } catch (error) {
        console.log(error);
    }
}

start();