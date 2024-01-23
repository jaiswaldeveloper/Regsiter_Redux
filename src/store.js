import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Path to your root reducer
import {thunk} from 'redux-thunk'; // For asynchronous actions (if needed)

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([thunk]),
  });
  export default store;
