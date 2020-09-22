import { createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import { createLogger } from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import  thunk from 'redux-thunk'

import { LoadingReducer } from '../loading/reducers';
import { ProductsReducer } from '../products/reducers'
import { UsersReducer } from '../users/reducers'

//createStoreの再定義 - historyを引数で受け、connected-react-routerの利用を抽象化
export default function createStore(history) {
    //redux-loggerの個々の設定を定義する
    let middleWares = [routerMiddleware(history), thunk]
    if (process.env.NODE_ENV === 'development') {
        const logger = createLogger({
            collapsed: true,
            diff: true,
        })
        middleWares.push(logger)
    }

    return reduxCreateStore(
        combineReducers({
            loading: LoadingReducer,
            products: ProductsReducer,
            router: connectRouter(history),
            users: UsersReducer,
        }),
        applyMiddleware(
            ...middleWares
        )
    )
}