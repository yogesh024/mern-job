import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String,
     required: true,
      trim: true },

  lastName: { type: String,
     required: true,
      trim: true },

  userName: { type: String, 
    required: true, 
    unique: true
    , trim: true },

  email: { type: String, 
    required: true, unique: true,
     trim: true },

  password: { type: String,
     required: true,
    //  select:false 
    },

  // profilePic: { 
  //   type: String,
  //   default: "/images/profilePic.jpeg" // Adjust the default value as needed
  // },
  
  isRecruiter: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
