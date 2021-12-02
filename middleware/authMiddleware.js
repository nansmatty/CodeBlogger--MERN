import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decode);

      req.user = await User.findById(decode.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized token failed');
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};
