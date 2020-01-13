export default function mainReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.user}
            
        case 'SET_FOLLOWED_REVIEWS':
            return {...state, followedReviews: action.followedReviews}

        case 'SET_TOP_FIVE':
            return {
                ...state, 
                topFive: action.topFive, 
                followerCountArray: action.followerCountArray
            }
            
        default: 
            return state
    }
}