import * as Action from './actions'
import  initialState from '../store/initialState'

export const LoadingReducer = (state = initialState.loading, action) => {
    switch (action.type) {
        case Action.HIDE_LOADING:
            return {
                ...state,
                ...action.payload
            }
        case Action.SHOW_LOADING:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}