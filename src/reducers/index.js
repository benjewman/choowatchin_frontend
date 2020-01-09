export default function mainReducer(state = {}, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                // ...state,
                // user: action.user
                ...action.user
            }
        default: 
            return state
    }
}