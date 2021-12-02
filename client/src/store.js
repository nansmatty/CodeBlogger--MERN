import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryListReducer,
} from './reducers/categoryReducer';
import {
  commentCreateReducer,
  commentDeleteReducer,
  myPostListsReducer,
  postCreateReducer,
  postDeleteReducer,
  postDetailsReducer,
  postListsReducer,
  postUpdateReducer,
  postLikeReducer,
  postDislikeReducer,
} from './reducers/postReducers';
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  postLists: postListsReducer,
  postCreate: postCreateReducer,
  postDetails: postDetailsReducer,
  myPostLists: myPostListsReducer,
  postUpdate: postUpdateReducer,
  postDelete: postDeleteReducer,
  commentCreate: commentCreateReducer,
  commentDelete: commentDeleteReducer,
  postLike: postLikeReducer,
  postDislike: postDislikeReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
