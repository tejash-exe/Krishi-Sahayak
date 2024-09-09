import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";
import options from "../utils/CookiesOptions.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const verifyJWTAdmin = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!accessToken) throw new Error("No access token!");

        const token = await jwt.verify(accessToken, process.env.ADMIN_ACCESS_TOKEN_SECRET);

        const admin = await Admin.findById(token._id);
        if(!admin) throw new Error("Invalid access token!");
        
        req.admin = admin;
        next();
    } catch (error) {
        try {
            const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
            if(!refreshToken) throw new Error("No refresh token!");

            const token = await jwt.verify(refreshToken, process.env.ADMIN_REFRESH_TOKEN_SECRET);

            const admin = await Admin.findById(token._id);
            if(!admin) throw new Error("Invalid refresh token!");

            if(refreshToken !== admin.refreshToken) throw new Error("Token does not match!");

            const newAccessToken = await admin.generateAccessToken()
            .catch(error => { throw new Error("Cannot able to generate new access token!")});

            req.admin = admin;
            res.cookie("accessToken", newAccessToken, options);
            next();
        } catch (error) {
            res.json(new ApiResponse(400, error.message));
        };
    };
};

export default verifyJWTAdmin;