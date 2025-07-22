import express from "express";
import cors from "cors";
import connectDB from "./src/config/db";
import authRouter from "./src/routes/authRoutes";
import propertyRouter from "./src/routes/propertyRouter"
import cookieParser from "cookie-parser";

// Connect to DB
connectDB();

const app = express();

// CORS
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);        // Local auth routes
app.use("/api/property", propertyRouter )
// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
