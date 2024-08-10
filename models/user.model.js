import { Schema, model } from "mongoose";


const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [3, "Too short name"],
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      minLength: [3, "Too short password"],
      maxLength: [30, "Too long password"],
    },

    age: {
      type: Number,
      min: [1],
      max: [2],
    },
    isActive: { Boolean, default: true },
  },

  {
    timestamps: true,
  }
);

export const userModel = model("user", userSchema);
