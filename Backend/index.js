// Import required dependencies
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import dbConnect from './config/database.js';
import Cloudinary from './config/cloudinary.js';
//import testingRoutes from './routes/testingRoutes.js';

// Load environment variables from the .env file
dotenv.config();

// Create an Express application
const app = express();

// Required env string
const PORT = process.env.PORT;

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware setup
app.use(cookieParser());
app.use(express.json());

// File upload configuration
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

// Connect to the database
dbConnect();

// Connect to Cloudinary
Cloudinary.cloudinaryConnect();

// Routing
//app.use("/api/v1", testingRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
