import asyncHandler from 'express-async-handler';
import Category from '../models/CategoryModel.js';

// @desc    Create Category
// @route   POST /api/category
// @access  Private/Admin

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //Check category already exist or not
  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    res.status(400);
    throw new Error(`${name} category already created.`);
  }

  const newCategory = await Category.create({ name });

  if (newCategory) {
    return res.status(200).json({ name });
  }
});

// @desc    Fetch all Category
// @route   GET /api/category
// @access  Public

export const getCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  return res.json(categories);
});

// @desc    Delete Category
// @route   DELETE /api/category/:id
// @access  Private/Admin

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await category.remove();
    res.json({ message: 'Category deleted' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});
