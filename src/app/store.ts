import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './features/todo/todoSlice'
import storage from 'redux-persist/lib/storage';
// import authReducer from './slice/authSlice';
// import layoutReducer from './slice/layoutSlice';
import { persistReducer, persistStore, REHYDRATE, PERSIST, REGISTER } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todos']
};

const rootReducer = combineReducers({
    todos: todoReducer
//   auth: authReducer,
//   layout: layoutReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PERSIST, REGISTER],
      },
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;