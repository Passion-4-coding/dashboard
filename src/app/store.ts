import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { auth } from '../modules/auth';


export const store = configureStore({
  reducer: {
    auth
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false })
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
