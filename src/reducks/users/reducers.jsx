import * as Actions from './actions'
import  initialState from '../store/initialState'

export const UserReducer = (state = initialState.users, action) =>{
    switch (action.type) {
        case Actions.SIN_IN:
            return {
                ...state,
                ...action.payload,
            }
            default:
                return state
    }
}