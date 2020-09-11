import { createStore as reduxCreateStore, combineReducers } from 'redux'

import { UserReducer } from '../users/reducers'

export default function createStore() {
    return reduxCreateStore(
        combineReducers({
            users: UserReducer
        })
    )
}