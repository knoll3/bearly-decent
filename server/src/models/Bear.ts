import mongoose from "mongoose";

const BearSchema = new mongoose.Schema({
    name: String,
    hash: String,
    speech: String,
});

export const Bear = mongoose.model("Bear", BearSchema);
