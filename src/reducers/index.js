export default function mainReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_USER':
            return {...action.user}
        default: 
            return state
    }
}