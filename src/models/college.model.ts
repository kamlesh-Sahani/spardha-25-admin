import mongoose from "mongoose";

export interface CollegeType {
    name: string;
}

const collegeSchema = new mongoose.Schema<CollegeType>(
    {
        name: {
            type: String,
            required: [true, "Please enter the name of the college"],
            unique:true
        },
    },
    { timestamps: true }
);

// Ensure the model is not recompiled when using hot reloading (e.g., in Next.js)
const collegeModel =
    mongoose.modelNames().includes("college")
        ? mongoose.model<CollegeType>("college")
        : mongoose.model<CollegeType>("college", collegeSchema);

export default collegeModel;
