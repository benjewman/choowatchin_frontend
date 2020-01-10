export default function mainReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.user}
            
        case 'SET_FOLLOWED_REVIEWS':
            return {...state, followedReviews: action.followedReviews}
        default: 
            return state
    }
}