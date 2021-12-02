import axios from 'axios';
import { logout } from './userActions';
import { toast } from 'react-toastify';
import {
  MY_POST_LIST_FAIL,
  MY_POST_LIST_REQUEST,
  MY_POST_LIST_SUCCESS,
  POST_COMMENT_CREATE_FAIL,
  POST_COMMENT_CREATE_REQUEST,
  POST_COMMENT_CREATE_SUCCESS,
  POST_COMMENT_DELETE_FAIL,
  POST_COMMENT_DELETE_REQUEST,
  POST_COMMENT_DELETE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
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
  POST_UPDATE_SUCCESS,
  SINGLE_POST_VIEW_FAIL,
  SINGLE_POST_VIEW_REQUEST,
  SINGLE_POST_VIEW_SUCCESS,
} from '../constant/postConstants';

// List Posts with Page Number and search keyword=======================================

export const listPosts =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: POST_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/posts?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: POST_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({
        type: POST_LIST_FAIL,
        payload: toast.error(message),
      });
    }
  };

// Single Post show action ============================================================

export const listPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_POST_VIEW_REQUEST });

    const { data } = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: SINGLE_POST_VIEW_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: SINGLE_POST_VIEW_FAIL,
      payload: toast.error(message),
    });
  }
};

// List Post created by a particular user show action ============================================================

export const allPostsByUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_POST_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/posts/myposts`, config);

    dispatch({
      type: MY_POST_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: MY_POST_LIST_FAIL,
      payload: toast.error(message),
    });
  }
};

// Post create action ============================================================

export const createPost =
  (title, desc, img, categories) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/posts`,
        { title, desc, img, categories },
        config
      );

      dispatch({
        type: POST_CREATE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: POST_CREATE_FAIL,
        payload: toast.error(message),
      });
    }
  };

// Post update action ============================================================

export const updatePost =
  (id, title, desc, image, categories) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/posts/${id}`,
        { title, desc, image, categories },
        config
      );

      dispatch({
        type: POST_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: POST_UPDATE_FAIL,
        payload: toast.error(message),
      });
    }
  };

// Post delete action start ============================================================

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/posts/${id}`, config);

    dispatch({
      type: POST_DELETE_SUCCESS,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: POST_DELETE_FAIL,
      payload: toast.error(message),
    });
  }
};

// Post delete action complete ============================================================

// Post comment create action start ============================================================

export const createComment = (id, text) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_COMMENT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/posts/${id}/comment`,
      { text },
      config
    );

    dispatch({
      type: POST_COMMENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }

    dispatch({
      type: POST_COMMENT_CREATE_FAIL,
      payload: toast.error(message),
    });
  }
};

// Post comment create action complete ============================================================

// Comment delete action start ============================================================

export const deleteComment = (id, commentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_COMMENT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/posts/${id}/comment/${commentId}`, config);

    dispatch({
      type: POST_COMMENT_DELETE_SUCCESS,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: POST_COMMENT_DELETE_FAIL,
      payload: toast.error(message),
    });
  }
};

// Comment delete action complete ============================================================

//Like on Post action start ===============================================================

export const likePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIKE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/posts/like/${id}`, config);

    dispatch({
      type: POST_LIKE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: POST_LIKE_FAIL,
      payload: toast.error(message),
    });
  }
};

//Like on Post action complete ===============================================================

//Dislike on Post action start ===============================================================

export const dislikePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_DISLIKE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.put(`/api/posts/dislike/${id}`, config);

    dispatch({
      type: POST_DISLIKE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: POST_DISLIKE_FAIL,
      payload: toast.error(message),
    });
  }
};

//Dislike on Post action complete ===============================================================
