import express from 'express';
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  disLikePost,
  getPostById,
  getPostByUserId,
  getPosts,
  likePost,
  updatePost,
} from '../controller/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPosts).post(protect, createPost);
router.route('/myposts').get(protect, getPostByUserId);
router.route('/:id/comment').post(protect, createComment);
router.route('/:id/comment/:comment_id').delete(protect, deleteComment);
router.route('/like/:id').put(protect, likePost);
router.route('/dislike/:id').put(protect, disLikePost);
router
  .route('/:id')
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

export default router;
