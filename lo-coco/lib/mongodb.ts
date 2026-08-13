import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};


// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please define MONGODB_URI in .env.local");
// }

// const mongoURI: string = MONGODB_URI;

// interface MongooseCache {
//   conn: typeof mongoose | null;
//   promise: Promise<typeof mongoose> | null;
// }

// declare global {
//   var mongoose: MongooseCache | undefined;
// }

// const globalForMongoose = global as typeof globalThis & {
//   mongoose?: MongooseCache;
// };

// const cached: MongooseCache =
//   globalForMongoose.mongoose ??
//   (globalForMongoose.mongoose = {
//     conn: null,
//     promise: null,
//   });

// export async function connectDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(mongoURI);
//   }

//   cached.conn = await cached.promise;

//   return cached.conn;
// }