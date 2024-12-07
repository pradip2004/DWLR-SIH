import mongoose from 'mongoose';

const authoritySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  phone: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Authority = mongoose.model('Authority', authoritySchema);

export default Authority;
