import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

// void means we don't care what it returns
export default async function dbConnect(): Promise<void> {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;

    // console.log("Database connection successful\n", db);
    // console.log("Connections: ", db.connections);
  } catch (error) {
    console.log("Database connection failed", error);
    // Gracefully exit the app in case of connection failed
    process.exit(1);
  }
}
