export const setUser = user => {
    return {
        type: 'SET_USER',
        user
    }
}

export const setFollowedReviews = followedReviews => {
    return {
        type: 'SET_FOLLOWED_REVIEWS',
        followedReviews: followedReviews
    }
}

export const setTopFive = (topFive, followerCountArray) => {
    return {
        type: 'SET_TOP_FIVE',
        topFive: topFive,
        followerCountArray: followerCountArray
    }
}

export const setLeaders = leaders => {
    return {
        type: 'SET_LEADERS',
        leaders: leaders
    }
}

export const addLeader = leader => {
    return {
        type: 'ADD_LEADER',
        leader: leader
    }
}

export const removeLeader = leader_id => {
    return {
        type: 'REMOVE_LEADER',
        leader_id: leader_id
    }
}