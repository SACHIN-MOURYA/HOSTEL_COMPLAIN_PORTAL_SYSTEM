import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String, 
        trim: true,
    },
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    contactNo: {
        type: String,
    },
    regNo: {
        type: String,
    },
    image: {
        type: String,
    },
    roomNo: {
        type: String,
    },
    email: {
        type: String,
        required: true, 
        trim: true,
    },
    password: {
        type: String,
        required: true, 
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
    },
    pendingComplaints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint',
    }],
    ongoingComplaints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint',
    }],
    solvedComplaints: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint',
    }],
    token: {
        type: String,
    }
});

export const User = mongoose.model("User", userSchema);
