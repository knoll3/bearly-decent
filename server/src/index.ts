import express from "express";
import mongoose from "mongoose";

const port = 8080;
const mongoUrl = "mongodb://localhost:27017/bears";

const app = express();

export const router = express.Router();

// Connect to mongo db
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// List to port
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
