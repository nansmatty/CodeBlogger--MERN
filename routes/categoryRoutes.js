import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategory,
} from '../controller/categoryController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createCategory).get(getCategory);
router.route('/:id').delete(protect, admin, deleteCategory);

export default router;
