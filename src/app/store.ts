import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { auth } from '../modules/auth';
import { quiz } from '../modules/quiz';
import { articles } from '../modules/articles';
import { karma } from '../modules/karma';
import { members } from '../modules/members';


export const store = configureStore({
  reducer: {
    auth,
    quiz,
    articles,
    karma,
    members
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
