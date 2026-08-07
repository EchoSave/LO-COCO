// import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI!;

// export const connectDB = async () => {
//   if (mongoose.connection.readyState >= 1) return;

//   return mongoose.connect(MONGO_URI);
// };


//Prototype for testing without a real database connection
// export const connectDB = async () => {
//   console.log("Mock DB connected (prototype)");
// };



import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

const mongoURI: string = MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const globalForMongoose = global as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached: MongooseCache =
  globalForMongoose.mongoose ??
  (globalForMongoose.mongoose = {
    conn: null,
    promise: null,
  });

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoURI);
  }

  cached.conn = await cached.promise;

  return cached.conn;
}