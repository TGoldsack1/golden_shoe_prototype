import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  forenames: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  basket: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

userSchema.pre('save', async function pre(next) {
  try {
    const user = this;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre('save', async function pre(next) {
  try {
    const user = this;
    const exist = await user.constructor
      .findOne({ email: this.email }, 'email')
      .exec();
    if (exist) {
      user.invalidate('email', 'email must be unique');
      next(new Error('email must be unique'));
    } else next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('User', userSchema);
