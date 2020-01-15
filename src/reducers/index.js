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

        case 'SET_LEADERS':
            return {
                ...state,
                leaders: action.leaders
            }
            
        case 'ADD_LEADER':
            return {
                ...state,
                leaders: [...state.leaders, action.leader]
            }

        case 'REMOVE_LEADER':
            const updatedLeaders = state.leaders.filter(leader => leader.id !== action.leader_id)
            return {
                ...state,
                leaders: updatedLeaders
            }

        case 'SET_SEARCH':
            return {
                ...state,
                search: action.search
            }
        
        default: 
            return state
    }
}