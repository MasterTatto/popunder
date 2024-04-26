import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import globalReducer from './slice/global.slice'
import {globalApi} from "./global.service";

export const storeRedux = configureStore({
    reducer: {
        [globalApi.reducerPath]: globalApi.reducer,
        global: globalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            globalApi.middleware,
        ),
})

setupListeners(storeRedux.dispatch)
