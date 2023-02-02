import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productRedux";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  addUsersStart,
  addUserstSuccess,
  addUsersFailure,
  updateUserstStart,
  updateUsersSuccess,
  updateUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFailure,
} from "./getUsersRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

//後台獲得所有的使用者資訊
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

export const deleteUsers = async (id, dispatch) => {
  dispatch(deleteUsersStart());
  try {
    // const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUsersSuccess(id));
  } catch (err) {
    dispatch(deleteUsersFailure());
  }
};

export const addUsers = async (user, dispatch) => {
  dispatch(addUsersStart());
  try {
    const res = await userRequest.post("/auth/register", user);
    dispatch(addUserstSuccess(res.data));
  } catch (err) {
    dispatch(addUsersFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserstStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUsersSuccess(res.data));
  } catch (err) {
    dispatch(updateUsersFailure());
  }
};
