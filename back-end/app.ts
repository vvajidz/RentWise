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

app.post("/test", (req, res) => {
  console.log("✅ working test route", req.body);
  res.json({ ok: true });
});
// Routes
app.use("/api/auth", authRouter); 
app.use("/api/property", propertyRouter )


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
