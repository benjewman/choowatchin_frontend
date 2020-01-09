export default function mainReducer(state = {}, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...action.user}
        default: 
            return state
    }
}