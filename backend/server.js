// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js"; 
import authRoutes from "./routes/auth.js";
import teacherRoutes from "./routes/teacher.js";
import studentRoutes from "./routes/student.js";
import adminRoutes from "./routes/admin.js";
import ticketRoutes from "./routes/tickets.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed origins for both dev + prod
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://sarv-shiksha.vercel.app"
];

// ✅ CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/auth", authRoutes);
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);
app.use("/api/tickets", ticketRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
