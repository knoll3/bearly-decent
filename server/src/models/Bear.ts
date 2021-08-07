import mongoose from "mongoose";

const BearSchema = new mongoose.Schema({
    name: String,
    description: String,
});

export const Bear = mongoose.model("Bear", BearSchema);
