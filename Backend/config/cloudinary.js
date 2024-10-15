
// Import Cloudinary and dotenv
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Cloudinary connection function
const cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        console.log('Cloudinary connected successfully');
    } catch (error) {
        console.log('Error connecting to Cloudinary:', error);
    }
};

// Export the cloudinaryConnect function
export default  { cloudinaryConnect };
