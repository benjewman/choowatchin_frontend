import React from 'react'
import ReviewFeedCard from '../components/ReviewFeedCard'
import { connect } from 'react-redux'
import WithAuth from '../components/WithAuth'

class FeedContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            reviews: []
        }
    }
    
    componentWillUpdate(nextProps) {
        if (nextProps.user !== this.props.user) {
            const reqObj = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'UserId': `Bearer ${nextProps.user.id}`
                }
            }
            fetch(`http://localhost:3000/reviews`, reqObj)
            .then(resp => resp.json())
            .then(data => {
                console.log('mounting feed', data)
                this.setState({reviews: data})
            })
        } 
    }

    renderReviewCards = () => {
        // return this.props.followedReviews.map(review => <ReviewFeedCard review={review} key={review.id}/>)
        return this.state.reviews.map(review => <ReviewFeedCard review={review} key={review.id}/>)

    }
    
    render() {
        console.log('passing props', this.props)
        return (
            // renderReviewCards breaks without the
            // ternary because followedReviews is undefined
            // until the fetch from auth comes back

            // this.props.followedReviews ? this.renderReviewCards() : null
            this.renderReviewCards()
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         user: state.user
//     }
// }

export default FeedContainer