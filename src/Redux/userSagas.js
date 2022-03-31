import * as types from "./actionTypes";

import {
  all,
  call,
  delay,
  fork,
  put,
  takeEvery,
  takeLatest,
  take,
} from "redux-saga/effects";
// import {
//   createUsersApi,
//   deleteUsersApi,
//   loadUsersApi,
//   updateUsersApi,
// } from "./api";
import {
  createUsersError,
  createUsersSuccess,
  deleteUsersError,
  deleteUsersSuccess,
  loadUsersError,
  loadUsersSuccess,
  updateUsersSuccess,
} from "./actions";
import axios from "axios";

function* onLoadUsersStartAsync() {
  try {
    //   const response = yield call(loadUsersApi);
    const response = yield call(axios.get, "http://localhost:5000/users");
    console.log("....res", response);
    if (response.status === 200) {
      yield console.log("success load..");
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield console.log("error load...");
    yield put(loadUsersError(error.response.data));
  }
}

function* onCreateUsersStartAsync({ payload }) {
  try {
    //const response = yield call(createUsersApi, payload);
    const response = yield call(
      axios.post,
      "http://localhost:5000/users",
      payload
    );
    if (response.status === 201) {
      yield console.log("success create...");
      yield delay(500);
      yield put(createUsersSuccess(response.data));
    }
  } catch (error) {
    yield console.log("error create...");
    yield put(createUsersError(error.response.data));
  }
}

function* onDeleteUsersStartAsync(userId) {
  try {
    // const response = yield call(deleteUsersApi, userId);
    const response = yield call(
      axios.delete,
      `http://localhost:5000/users/${userId}`
    );
    if (response.status === 200) {
      yield console.log("success delete...");
      yield delay(500);
      yield put(deleteUsersSuccess(userId));
    }
  } catch (error) {
    yield console.log("error delete...");
    yield put(deleteUsersError(error.response.data));
  }
}

function* onUpdateUsersStartAsync({ payload: { id, formValue } }) {
  try {
    // const response = yield call(updateUsersApi, id, formValue);

    const response = yield call(
      axios.put,
      `http://localhost:5000/users/${id}`,
      formValue
    );

    if (response.status === 200) {
      yield console.log("success update...");
      yield delay(500);
      yield put(updateUsersSuccess());
    }
  } catch (error) {
    yield console.log("error update...");
    yield put(deleteUsersError(error.response.data));
  }
}

function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUsers() {
  yield takeLatest(types.CREATE_USER_START, onCreateUsersStartAsync);
}

function* onUpdateUsers() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUsersStartAsync);
}

function* onDeleteUsers() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START);
    yield call(onDeleteUsersStartAsync, userId);
  }
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUsers),
  fork(onDeleteUsers),
  fork(onUpdateUsers),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
