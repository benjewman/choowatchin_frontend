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