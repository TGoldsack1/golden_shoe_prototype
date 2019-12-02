import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: false,
  }
});

export default mongoose.model('Product', productSchema);

