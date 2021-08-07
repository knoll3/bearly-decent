import mongoose from "mongoose";

const BearSchema = new mongoose.Schema({
    name: String,
});

export const Bear = mongoose.model("Bear", BearSchema);
