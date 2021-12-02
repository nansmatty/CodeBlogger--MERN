import axios from 'axios';
import { toast } from 'react-toastify';
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from '../constant/categoryConstants';
import { logout } from './userActions';

// CATEGORY LIST ACTION ===================================================================

export const listCategory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const { data } = await axios.get('/api/category/');

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
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
      type: CATEGORY_LIST_FAIL,
      payload: toast.error(message),
    });
  }
};

// CATEGORY CREATE ACTION ===================================================================

export const createCategory = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/category/', { name }, config);

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
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
      type: CATEGORY_CREATE_FAIL,
      payload: toast.error(message),
    });
  }
};

// CATEGORY DELETE ACTION ===================================================================

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/category/${id}`, config);

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
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
      type: CATEGORY_DELETE_FAIL,
      payload: toast.error(message),
    });
  }
};
