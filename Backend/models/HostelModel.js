import mongoose from 'mongoose';

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    careTaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Caretaker",
        required: false,
    },
    warden: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warden",
        required: false,
    },
    wings: [{
        wingNo: { type: String },
        roomNo: [{ type: String }]
    }]
});

export default mongoose.model('Hostel', hostelSchema);
