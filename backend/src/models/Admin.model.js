import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Error! Must include name'],
    },
    phone: {
        type: Number,
        min: [1000000000, 'Error! Must be a 10-digit no.'],
        max: [9999999999, 'Error! Must be a 10-digit no.'],
        required: [true, 'Error! Must include Phone no.'],
        unique: [true, 'Error! Phone no. must be unique']
    },
    password: {
        type: String,
        required: [true, 'Error! Must include password'],
    },
    refreshToken: {
        type: String,
        default: "",
    }
}, { timestamps: true });

adminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

adminSchema.methods.isPasswordCorrect = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

adminSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            phone: this.phone
        },
        process.env.ADMIN_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXPIRY,
        }
    )
};
adminSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ADMIN_REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.ADMIN_REFRESH_TOKEN_EXPIRY,
        }
    )
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;