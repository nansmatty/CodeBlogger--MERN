import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please Author is required'],
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisLiked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        text: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
        pic: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    categories: {
      type: Array,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' },
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
