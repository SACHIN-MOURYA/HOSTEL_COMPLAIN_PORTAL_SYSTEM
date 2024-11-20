import mongoose from 'mongoose';

const chiefWardenSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    hostelsManaged: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel'
    }],
    complaints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint'
    }]
});

export default mongoose.model('ChiefWarden', chiefWardenSchema);

