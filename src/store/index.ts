import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice.";
import products from "./Products/productsSlice.";
import cart from "./cart/cartSlice";
import wishlist from "./wishlist/wishlistSlice";
import auth from "./auth/authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// ...

const cartpersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};
const whitelistpersistConfig = {
  key: "wishlist",
  storage,
  whitelist: ["itemsId"],
};
const rootReducer = combineReducers({
  categories,
  products,
  cart: persistReducer(cartpersistConfig, cart),
  wishlist: persistReducer(whitelistpersistConfig, wishlist),
  auth,
});

let store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
let persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
