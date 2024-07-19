import mongoose from "mongoose"
const ApplySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
    },
    coverLetter:{
        type:String,
    },
    phone:{
        type:Number,
        required:true,

    },
    address:{
        type:String,
        required:true,

    },
    resume:{
        public_id:{
        type:String,
        required:true,
        },
        url:{
            type:String,
            required:true
        }
        
    },
    applicantId:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            // required:true,

        },
        isRecruiter: {
            type: Boolean,
            enum:[false],
             required:true,
          }
        },
    employerId:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
             required:true,

        },
        isRecruiter: {
            type: Boolean,
            enum:[true],
             required:true,
          }
        }
})
export const Apply =mongoose.model("Apply",ApplySchema)