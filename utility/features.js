import mongoose from "mongoose";
import jwt from "jsonwebtoken";


export const cookieOption = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
};


export const connectDB = (url) => {
    mongoose
        .connect(url, { dbName: "review" })
        .then((data) => {
            console.log(`connect to DB : ${data.connection.host}`);
        })
        .catch((err) => {
            console.log(err);
        });
};



export const sendToken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res.status(code).cookie("authToken", token, cookieOption).json({
        success: true,
        message,
    });
};
