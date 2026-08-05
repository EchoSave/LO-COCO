// import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI!;

// export const connectDB = async () => {
//   if (mongoose.connection.readyState >= 1) return;

//   return mongoose.connect(MONGO_URI);
// };


//Prototype for testing without a real database connection
export const connectDB = async () => {
  console.log("Mock DB connected (prototype)");
};
