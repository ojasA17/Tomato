import mongoose from "mongoose";

export const connectDB=async() => {
    await mongoose.connect('mongodb+srv://ojasaglaweug21:ojas1701200314@cluster0.dbev3dd.mongodb.net/food-del').then(()=>console.log("DB connected"));
}