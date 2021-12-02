import mongoose from 'mongoose';
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' },
  }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
