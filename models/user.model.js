import mongoose from "mongoose";
import validator from "validator";  
import jwt from 'jsonwebtoken';



const userSchema = new mongoose.Schema({
  name: 
  { type: String,
    required: true
  },
  email: { 
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"]
     },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password Must Contain At Least 8 Characters!"]
    }
}, { timestamps: true });



userSchema.methods.generateJsonWebToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export const User = mongoose.model("User", userSchema);

