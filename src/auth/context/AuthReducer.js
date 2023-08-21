import { types } from "../types/types"


export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:
            console.log('logged', state.logged)
            return {
                ...state,
                logged: true,
                user: action.payload
            }
        case types.logout:
            console.log('logged', state.logged)
            return {
                logged: false
            }
        default:
            return state
    }
}