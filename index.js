import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utility/features.js";
import userRouter from "./routers/user.js";
import businessRouter from "./routers/business.js";
import reviewRouter from "./routers/review.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./utility/utility.js";

dotenv.config();
connectDB(process.env.MONGO_URL);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [process.env.REACT_URL],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/business", businessRouter);
app.use("/api/v1/review", reviewRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
