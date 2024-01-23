// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers'; // Path to your root reducer
// import {thunk} from 'redux-thunk'; // For asynchronous actions (if needed)

// const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([thunk]),
//   });



//   export default store;
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducers from './reducers/userReducers';

const rootReducer = combineReducers({
  user: userReducers,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
