import "dotenv/config";
import mongoose from "mongoose";
import Admin from "../models/Admin";

const seedAdmin = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB Connected ✅");

    // Cek apakah admin sudah ada
    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("Admin already exists, skipping seed");
      process.exit(0);
    }

    // Buat admin baru
    await Admin.create({
      username: "admin",
      password: "dkayateen2024",
    });

    console.log("Admin created successfully ✅");
    console.log("Username: admin");
    console.log("Password: dkayateen2024");
    process.exit(0);
  } catch (error) {
    console.error("Seeder error:", error);
    process.exit(1);
  }
};

seedAdmin();
