import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authReducer from "./user/userSlice";
import counterReducer from "./counter/counterSlice";
// import langReducer from "./language/languageSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,persistStore } from "redux-persist";
import { createFilter } from "redux-persist-transform-filter";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    transforms: [createFilter("counter", [])],
};

const rootReducer = combineReducers({
    // auth: authReducer,
    counter: counterReducer,
    // lang: langReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    });
    export const persistor = persistStore(store)
    
// export type RootState = ReturnType<typeof store.getState>
export type IRootState = ReturnType<typeof rootReducer>;