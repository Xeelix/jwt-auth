import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TokenSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    refreshToken: {type: String, required: true},
});

export default mongoose.model("Token", TokenSchema);