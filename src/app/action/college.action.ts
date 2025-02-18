"use server";
import collegeModel, { CollegeType } from "@/models/college.model";
import dbConnect from "@/utils/dbConnect.util";

export const newCollege = async (collegeData: CollegeType) => {
  try {
    await dbConnect();
    const { name } = collegeData;

    if (!name) {
      return {
        success: false,
        message: "Please enter the name of college",
      };
    }

    const isExist = await collegeModel.findOne({ name: name.toLowerCase() });
    if (isExist) {
      return {
        success: false,
        message: "college name is already exists",
      };
    }
    const college = await collegeModel.create({
      name,
    });
    if (!college) {
      return {
        success: false,
        message: "failed to create try again",
      };
    }

    return {
      success: true,
      message: "successfuly collge added.",
    };
  } catch (error: any) {
    return {
      message: error.message || "internal error",
      success: false,
    };
  }
};

export const allColleges = async () => {
  try {
    await dbConnect();
    const colleges = await collegeModel.find({});
    return {
      colleges: JSON.stringify(colleges),
      success: true,
      message: "successfuly get",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "internal error",
    };
  }
};

export const updateCollege = async ({
  _id,
  name,
}: {
  _id: string;
  name: string;
}) => {
  try {
    if (!_id || !name) {
      return {
        message: "please fill the all detailes",
        success: false,
      };
    }

    const college = await collegeModel.findById(_id);
    if (!college) {
      return {
        message: "College is not found",
        success: false,
      };
    }

    college.name = name;
    await college.save({validateBeforeSave:true});

    return {
      message: "College name updated",
      success: true,
    };
  } catch (error: any) {
    return {
      message: error.message || "Internal error",
      success: false,
    };

  }
};
