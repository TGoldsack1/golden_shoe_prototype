import mongoose from 'mongoose';

const { Schema } = mongoose;

const discountSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  }
});

export default mongoose.model('Discount', discountSchema);
