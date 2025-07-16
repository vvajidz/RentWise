import express from "express";
import cors from "cors";
import connectDB from "./src/config/db";
import authRouter from "./src/routes/authRoutes";
import cookieParser from "cookie-parser";

// ---------------------------------------------------------------
connectDB();

const app = express();

// ---------------------------------------------------------------CORS
app.use(cors({
  origin: "http://localhost:3000", // frontend port
  credentials: true
}));

// ---------------------------------------------------------------Middlewares
app.use(express.json());
app.use(cookieParser());

// ---------------------------------------------------------------Routes
app.use("/api/auth", authRouter);

// ---------------------------------------------------------------Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
