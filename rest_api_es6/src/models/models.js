import mongoose from 'mongoose'

//creating an object schema
const Schema=mongoose.Schema

export const contactSchema=new Schema({
    firstName:{
        type:String,
        required:'Enter a first name'
    },
    lastName:{
        type:String,
        required:'Enter a last name'
    },
    email:{
        type:String     
    },
    company:{
        type:String
    },
    contactNumber:{
        type:Number
    },
    created_date:{
        type:Date,
        default:Date.now
    }
});