import * as Actions from './actions'
import  initialState from '../store/initialState'

export const UsersReducer = (state = initialState.users, action) =>{
    switch (action.type) {
        case Actions.FETCH_ORDERS_HISTORY:
            return {
                ...state,
                orders: [...state.payload]
            }
        case Actions.FETCH_PRODUCTS_IN_CART:
            return {
                ...state,
                cart: [...state.payload]
            }
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload,
            }
        case Actions.SIGN_OUT:
            return {
                ...initialState.users,
            }
            default:
                return state
    }
}