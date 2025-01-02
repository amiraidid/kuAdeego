import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";
import connectDB from "./config/db.js";
import path from "path";
import { sendEMail } from "./config/emailService.js";
import authRouter from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cartListRoutes from "./routes/cartlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const server = express();
server.use(cors());
server.use(express.json());
dotenv.config({ path: "./.env" });
const __dirname = path.resolve();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

server.use("/auth", authRouter);
server.use("/products", productRoutes);
server.use("/admin", adminRoutes);
server.use("/cartlist", cartListRoutes);
server.use("/order", orderRoutes);


// email route
server.post("/send-email", authMiddleware, async (req, res) => {
  try {
    const { email, name, message } = req.body;

    if (!email || !name || !message) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const info = await sendEMail(email, name, message);
    res
      .status(200)
      .json({
        message: "Your message has been sent! We will get back to you soon.",
        info,
      });
  } catch (error) {
    console.log("error Message", error.message);
    res.status(500).json({ message: error.message });
  }
});


if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.join(__dirname, "/frontend/dist")));

  server.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}



const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  connectDB();
  console.log(`server is listening at port ${PORT}`);
});
