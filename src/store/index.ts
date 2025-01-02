import { createStore, applyMiddleware, AnyAction } from "redux";
import { thunk, ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./root-reducer";

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunk)
  // other store enhancers if any
);

const store = createStore(rootReducer, composedEnhancer);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

// export type AppDispatch = typeof store.dispatch;
export default store;
