import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Define TypeScript Interface for Admin
interface IAdmin extends Document {
  email: string;
  password: string;
  role: "admin" | "user";
  comparePassword(candidatePassword: string): Promise<boolean>;
  active:boolean;
}

// Admin Schema
const AdminSchema = new mongoose.Schema<IAdmin>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valid email format
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Ensures password security
    select: false, // Password will not be selected by default in queries
  },
  role: {
    type: String,
    required: [true, "please enter the role"],
  },
  active:{
    type:Boolean,
    default:true
  }
},{timestamps:true});

// Hash password before saving
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Fix condition
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
AdminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Prevent duplicate model issues in Next.js hot reloading
const adminModel =
  mongoose.models.admin as Model<IAdmin> || mongoose.model<IAdmin>("admin", AdminSchema);

export default adminModel;
