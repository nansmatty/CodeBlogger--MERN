import {
  MY_POST_LIST_FAIL,
  MY_POST_LIST_REQUEST,
  MY_POST_LIST_SUCCESS,
  POST_COMMENT_CREATE_FAIL,
  POST_COMMENT_CREATE_REQUEST,
  POST_COMMENT_CREATE_RESET,
  POST_COMMENT_CREATE_SUCCESS,
  POST_COMMENT_DELETE_FAIL,
  POST_COMMENT_DELETE_REQUEST,
  POST_COMMENT_DELETE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_RESET,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DISLIKE_FAIL,
  POST_DISLIKE_REQUEST,
  POST_DISLIKE_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_RESET,
  POST_UPDATE_SUCCESS,
  SINGLE_POST_VIEW_FAIL,
  SINGLE_POST_VIEW_REQUEST,
  SINGLE_POST_VIEW_SUCCESS,
} from '../constant/postConstants';

export const postListsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true, posts: [] };
    case POST_LIST_SUCCESS:
      return {
        loading: false,
        posts: action.payload.posts,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDetailsReducer = (
  state = { post: { likes: [], dislikes: [], comments: [] } },
  action
) => {
  switch (action.type) {
    case SINGLE_POST_VIEW_REQUEST:
      return { ...state, loading: true };
    case SINGLE_POST_VIEW_SUCCESS:
      return { loading: false, post: action.payload };
    case SINGLE_POST_VIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const myPostListsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case MY_POST_LIST_REQUEST:
      return { loading: true, posts: [] };
    case MY_POST_LIST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };
    case MY_POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, success: true };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UPDATE_REQUEST:
      return { loading: true };
    case POST_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case POST_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case POST_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const commentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COMMENT_CREATE_REQUEST:
      return { loading: true };
    case POST_COMMENT_CREATE_SUCCESS:
      return { loading: false, success: true };
    case POST_COMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_COMMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const commentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COMMENT_DELETE_REQUEST:
      return { loading: true };
    case POST_COMMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_COMMENT_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const postLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LIKE_REQUEST:
      return { loading: true };
    case POST_LIKE_SUCCESS:
      return { loading: false, success: true };
    case POST_LIKE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const postDislikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DISLIKE_REQUEST:
      return { loading: true };
    case POST_DISLIKE_SUCCESS:
      return { loading: false, success: true };
    case POST_DISLIKE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
