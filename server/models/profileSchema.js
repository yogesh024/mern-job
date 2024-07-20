import mongoose from "mongoose";


// Define the Profile Schema
const ProfileSchema =new mongoose.Schema({
  bio: {
    type: String,
    trim: true
  },
  avatar: {
    type: String, // URL or path to the profile picture
    default: 'default-avatar.png'
  },
  
});

// Create and export the model
export default mongoose.model("Profile", ProfileSchema);
