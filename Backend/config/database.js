// Import Mongoose and dotenv
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Database connection function
export const dbConnect = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((error) => {
        console.error(`Error occurred: DB not connected. ${error}`);
        process.exit(1); // Exit with failure
    });
};
export default dbConnect;
