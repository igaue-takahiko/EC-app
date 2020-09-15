import { createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import { createLogger } from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import  thunk from 'redux-thunk'

import { ProductsReducer } from '../products/reducers'
import { UsersReducer } from '../users/reducers'

//createStoreの再定義 - historyを引数で受け、connected-react-routerの利用を抽象化
export default function createStore(history) {
    const logger = createLogger({
        collapsed: true,
        diff: true,
    })

    return reduxCreateStore(
        combineReducers({
            products: ProductsReducer,
            router: connectRouter(history),
            users: UsersReducer,
        }),
        applyMiddleware(
            logger,
            routerMiddleware(history),
            thunk
        )
    )
}