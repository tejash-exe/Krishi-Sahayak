import mongoose from "mongoose";
import Admin from "../models/Admin.model.js";
import Product from "../models/Product.model.js";
import options from "../utils/CookiesOptions.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const generateAccessAndRefreshToken = async (adminid) => {
    try {
        const admin = await Admin.findById(adminid);
        if (!admin) {
            throw new Error("Admin not found!");
        }
        const accessToken = await admin.generateAccessToken();
        const refreshToken = await admin.generateRefreshToken();

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error(error.message);
    };
};

const registerAdmin = async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        if ([name, phone, password].some((field) => field?.trim() === "")) {
            throw new Error("Error! Required fields are missing");
        };

        const checkAdmin = await Admin.findOne({ phone: phone.trim() });
        if (checkAdmin) throw new Error("Error! Admin already exists");

        const savedAdmin = await Admin.create(
            {
                name: name.trim(),
                phone: phone.trim(),
                password: password.trim(),
            }
        )
            .catch((error) => { 
                // console.log(error);
                throw new Error(error.message);
             });

        const admin = await Admin.findById(savedAdmin._id).select("-password -refreshtoken")
        res.json(new ApiResponse(200, "Successfully registered!", admin));
    } catch (error) {
        res.json(new ApiResponse(400, error.message));
    };
};

const loginAdmin = async (req, res) => {
    try {
        const { phone, password } = req.body;

        if ([phone, password].some((field => field?.trim() === ""))) {
            throw new Error("Error! Required fields are missing");
        };

        const admin = await Admin.findOne({ phone: phone?.trim() });
        if (!admin) throw new Error("Admin does not exist!");

        const isPasswordValid = await admin.isPasswordCorrect(password?.trim());
        if (!isPasswordValid) {
            throw new Error("Invalid password!");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(admin._id);

        const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken").lean();

        // const productIds = loggedInAdmin.wishlist.map(item => item.product._id);
        // loggedInAdmin.wishlist = productIds;

        res
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, "Logged in Succesfully!", {
                admin: loggedInAdmin,
                accessToken,
                refreshToken
            }));
    } catch (error) {
        res.json(new ApiResponse(400, error.message));
    };
};

const logoutAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.admin._id,
            {
                $set: {
                    refreshToken: "",
                },
            },
            {
                new: true,
            });
        if (!admin) {
            throw new Error("Cannot find admin!");
        }

        res
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, "Logged out Succesfully!"));
    } catch (error) {
        res.json(new ApiResponse(400, error.message));
    };
};

const updateName = async (req, res) => {
    try {
        const { newName, password } = req.body;
        if ([newName, password].some((field => field?.trim() === ""))) {
            throw new Error("Error! Required fields are missing");
        };

        const admin = await Admin.findById(req.admin._id);
        if (!admin) throw new Error("Admin not found!");

        const isPasswordValid = await admin.isPasswordCorrect(password?.trim());
        if (!isPasswordValid) {
            throw new Error("Invalid password!");
        }

        admin.name = newName?.trim();

        const savedAdmin = await admin.save()
            .catch((error) => { throw new Error("Error while saving!") });

        const updatedAdmin = await Admin.findById(savedAdmin._id).select("-password -refreshToken");

        res.json(new ApiResponse(200, "Name changed successfully!", updatedAdmin));
    } catch (error) {
        res.json(new ApiResponse(400, error.message));
    };
};

const updatePhone = async (req, res) => {
    try {
        const { newPhone, password } = req.body;
        if ([newPhone, password].some((field => field?.trim() === ""))) {
            throw new Error("Error! Required fields are missing");
        };

        const admin = await Admin.findById(req.admin._id);
        if (!admin) throw new Error("Admin not found!");

        const existedAdmin = await Admin.findOne({ phone: newPhone });
        if (existedAdmin) throw new Error("Admin already exists!");

        const isPasswordValid = await admin.isPasswordCorrect(password?.trim());
        if (!isPasswordValid) {
            throw new Error("Invalid password!");
        }

        admin.phone = newPhone?.trim();

        const savedAdmin = await admin.save()
            .catch((error) => { throw new Error("Error while saving!") });

        const updatedAdmin = await Admin.findById(savedAdmin._id).select("-password -refreshToken");

        res.json(new ApiResponse(200, "Phone no. changed successfully!", updatedAdmin));
    } catch (error) {
        res.json(new ApiResponse(400, error.message));
    };
};

const updatePassword = async (req, res) => {
    try {
        const { newPassword, password } = req.body;
        if ([newPassword, password].some((field => field?.trim() === ""))) {
            throw new Error("Error! Required fields are missing");
        };

        const admin = await Admin.findById(req.admin._id);
        if (!admin) throw new Error("Admin not found!");

        const isPasswordValid = await admin.isPasswordCorrect(password?.trim());
        if (!isPasswordValid) {
            throw new Error("Invalid password!");
        }

        admin.password = newPassword?.trim();

        const savedAdmin = await admin.save()
            .catch((error) => { throw new Error("Error while saving!") });

        const updatedAdmin = await Admin.findById(savedAdmin._id).select("-password -refreshToken");

        res.json(new ApiResponse(200, "Password changed successfully!", updatedAdmin));
    } catch (error) {
        res.json(new ApiResponse(400, error.message));
    };
};

const addProduct = async (req, res) => {
    try {
        const { name, brand, description, price, quantity } = req.body;

        if([name, brand, description, price, quantity].some(field => field?.trim() === "" )){
            throw new Error("Error! Required fields are missing");
        };

        const coverImagepath = req.file.path;

        const savedCoverImage = await uploadOnCloudinary(coverImagepath);
        if(!savedCoverImage) throw new Error("Unable to save cover image!");
 
        const savedProduct = await Product.create({
            name: name?.trim(),
            brand: brand?.trim(),
            description: description?.trim(),
            price: Number.parseFloat(price),
            quantity: Number.parseInt(quantity),
            coverImage: savedCoverImage,
        })
        .catch((error) => { throw new Error("Cannot able to create product database!")});

        const product = await Product.findById(savedProduct._id);
        if(!product) throw new Error("Cannot find product!");

        res.json(new ApiResponse(200,"Product saved Succesfully!", product));
        
    } catch (error) {
        console.log(error);
        res.json(new ApiResponse(400, error.message));
    }
}

export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    updateName,
    updatePhone,
    updatePassword,
    addProduct,
}; 