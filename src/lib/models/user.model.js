import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    }, {timestamps: true}
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User