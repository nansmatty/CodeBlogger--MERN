import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, ' Please provide a name'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, ' Please provide a email'],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Please add a password'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    pic: {
      type: String,
      required: true,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' },
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
