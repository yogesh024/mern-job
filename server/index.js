import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jobRoute from "./routes/postJob.js"
import profileRoute from "./routes/profile.js"
import authRoute from "./routes/auth.js";
import applyRoute from "./routes/applyRouter.js"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"
import dotenv from "dotenv";
import 'dotenv/config'
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.ClOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to mongoDB.");
    } catch (error) {
        console.error("Error connecting to mongoDB:", error);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // your frontend domain
    credentials: true
  }));
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"./temp/"
}))

app.use("/api/postjobs", jobRoute);
app.use("/api/getjobs", jobRoute);
app.use("/api/auth", authRoute);
app.use("/api/getjobsBymail", jobRoute);
app.use("/api/my-jobs", jobRoute);
app.use("/api/delete", jobRoute);
app.use("/api/apply",applyRoute );
app.use("/api/profile",profileRoute);




// sending data using email 
//for my-job part
// app.use("/api",jobRoute);


const port = process.env.PORT || 3002;

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    connect();
    console.log(`Server is working on port ${port}`);
});
