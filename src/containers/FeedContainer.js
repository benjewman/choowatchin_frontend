import React from 'react'
import ReviewFeedCard from '../components/ReviewFeedCard'

class FeedContainer extends React.Component {

    renderReviewCards = () => {
        return this.props.followedReviews.map(review => <ReviewFeedCard review={review} key={review.id}/>)
    }
    
    render() {
        console.log(this.props)
        return (
            // renderReviewCards breaks without the
            // ternary because followedReviews is undefined
            // until the fetch from auth comes back
            this.props.followedReviews ? this.renderReviewCards() : null
        )
    }
}

export default FeedContainer