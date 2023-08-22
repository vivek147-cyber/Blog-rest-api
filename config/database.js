import mongoose from "mongoose";

export const connectdb = async()=>{
  const {connection} = await mongoose.connect(process.env.MONGO_URL);

  console.log(`Database is connected with ${connection.host}`);
}