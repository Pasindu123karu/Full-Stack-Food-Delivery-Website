import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://greatstack:cap2553@cluster0.iktibti.mongodb.net/luxe-cloths').then(()=>console.log("DB Connected"));
}

