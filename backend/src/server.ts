import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import "dotenv/config";
import connectDB from "./config/db";
import connectCloudinary from "./config/cloudinary";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import testimonialRoutes from "./routes/testimonialRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL as string,
].filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "D'Kayateen API is running 🚀" });
});
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/testimonials", testimonialRoutes);

// Error handler
app.use(errorHandler);

// Connect then start
connectCloudinary();
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
