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

export const setReviewShow = show => {
    return {
        type: 'SET_REVIEW_SHOW',
        reviewShow: show
    }
}