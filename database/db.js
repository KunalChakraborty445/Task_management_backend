import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName : "taskManagementBackend"
        })
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((err) => {
            console.log(`Database connection failed: ${err.message}`);
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}