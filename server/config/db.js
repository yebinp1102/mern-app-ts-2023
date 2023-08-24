import mongoose from "mongoose";

export const connectDB = async() => {
  try{
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log('mongoDB connected');
  }catch(err){
    console.log(err);
    process.exit(1);
  }
}