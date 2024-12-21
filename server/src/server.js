import express from "express";
import dotenv from "dotenv";

import orderRoutes from "./routes/orderRoutes.js";
import detailRoutes from "./routes/detailRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const server = express();
server.use(express.json());

// ————— Rutas
server.use("/api/auth", authRoutes);
server.use("/api/orders", orderRoutes);
server.use("/api/orders/detail", detailRoutes);
server.use("/api/users", userRoutes);
server.use("/api/products", productRoutes);
server.use("/api/categories", categoryRoutes);

export default server;
