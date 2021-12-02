import asyncHandler from 'express-async-handler';
import Post from '../models/PostModel.js';
import User from '../models/UserModel.js';

// @desc    Create a post
// @route   POST /api/posts
// @access  Private

export const createPost = asyncHandler(async (req, res) => {
  const { title, desc, img, categories } = req.body;

  if (!title || !desc || !categories || !img) {
    res.status(400);
    throw new Error('Please fill all the fields');
  }
  const post = new Post({
    user: req.user._id,
    title,
    desc,
    img,
    categories,
  });

  const newPost = await post.save();
  res.status(200).json(newPost);
});

// @desc    Get all post
// @route   GET /api/posts
// @access  Public

export const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 9;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Post.countDocuments({ ...keyword });
  const posts = await Post.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ posts, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get post By Id
// @route   GET /api/posts/:id
// @access  Public

export const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Get post By User Id
// @route   GET /api/posts/myposts
// @access  Public

export const getPostByUserId = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user._id });
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(404);
    throw new Error('Posts not found');
  }
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private

export const updatePost = asyncHandler(async (req, res) => {
  const { title, desc, image, categories } = req.body;
  const post = await Post.findById(req.params.id);

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (post) {
    post.title = title;
    post.desc = desc;
    post.image = image;
    post.categories = categories;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not found!');
  }
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private and Admin

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.remove();
    res.json({ message: 'Post deleted' });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Like or remove like from post
// @route   PUT /api/posts/like/:id
// @access  Private

export const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const loginUser = req?.user?._id;
  const isLiked = post?.isLiked;
  const alreadyDisliked = post?.disLikes?.find(
    (user) => user?.toString() === loginUser?.toString()
  );

  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { disLikes: loginUser },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }

  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: loginUser },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { likes: loginUser },
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

// @desc    Dislike or remove dislike from post
// @route   PUT /api/posts/dislike/:id
// @access  Private

export const disLikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const loginUser = req?.user?._id;
  const isDisLiked = post?.isDisLiked;
  const alreadyLiked = post?.likes?.find(
    (userId) => userId?.toString() === loginUser?.toString()
  );

  if (alreadyLiked) {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: loginUser },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }

  if (isDisLiked) {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { disLikes: loginUser },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { disLikes: loginUser },
        isDisLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

// @desc    Comment on a post
// @route   POST /api/posts/comment/:id
// @access  Private

export const createComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  const newComment = {
    user: req.user._id,
    text: req.body.text,
    name: req.user.name,
    pic: req.user.pic,
  };

  if (post) {
    post.comments.push(newComment);

    await post.save();

    res.status(200).json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Delete Comment on a post
// @route   DELETE /api/posts/comment/:id/:comment_id
// @access  Private

export const deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  const comment = post.comments.find(
    (comment) => comment.id === req.params.comment_id
  );

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  //Check User

  if (comment.user.toString() === req.user._id.toString()) {
    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } else {
    res.status(401);
    throw new Error('User not authorized');
  }
});
