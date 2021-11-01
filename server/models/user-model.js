import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = Schema({
    email: {type: String, unique: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String, required: true},
});

export default mongoose.model("User", UserSchema);