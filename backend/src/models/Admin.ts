import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import type { IAdmin } from "../types/index";

const adminSchema = new Schema<IAdmin>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook — modern pattern tanpa "next" parameter
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

export default model<IAdmin>("Admin", adminSchema);
