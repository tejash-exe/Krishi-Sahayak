import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const addressSchema = new mongoose.Schema({
    localAddress: {
        type: String,
        required: [true, 'Error! Must include local address!'],
    },
    landmark: {
        type: String,
    },
    city: {
        type: String,
        required: [true, 'Error! Must include city!'],
    },
    state: {
        type: String,
        required: [true, 'Error! Must include state!'],
    },
    pincode: {
        type: Number,
        required: [true, 'Error! Must include pincode!'],
    }
});

const userSchema = new mongoose.Schema({
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
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1,
            },
            time: {
                type: Date,
            },
        }
    ],
    address: {addressSchema},
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            phone: this.phone
        },
        process.env.USER_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.USER_ACCESS_TOKEN_EXPIRY,
        }
    )
};
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.USER_REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.USER_REFRESH_TOKEN_EXPIRY,
        }
    )
};

const User = mongoose.model('User', userSchema);

export default User;