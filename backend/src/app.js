import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static("public"));

import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import adminRouter from "./routes/admin.routes.js";

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/admin", adminRouter);

export { app };