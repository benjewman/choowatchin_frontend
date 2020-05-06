import React from 'react'
import ReviewFeedCard from '../components/ReviewFeedCard'
import { url } from '../urls.js'

class FeedContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            reviews: []
        }
    }
    
    componentWillUpdate(nextProps) {
        if (!nextProps.user) {
            fetch(`${url}/reviews`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({reviews: data})
            })
        }
        if (nextProps.user !== this.props.user) {
            const reqObj = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'UserId': `Bearer ${nextProps.user.id}`
                }
            }
            fetch(`${url}/reviews`, reqObj)
            .then(resp => resp.json())
            .then(data => {
                this.setState({reviews: data})
            })
        } 
    }

    filterReviews = () => {
        switch (this.props.filter) {
            case 'just movies':
                return this.state.reviews.filter(review => review.show.medium === 'movies')
            case 'just series':
                return this.state.reviews.filter(review => review.show.medium === 'series')
            default:
                return this.state.reviews
        }
    }
    
    renderReviewCards = () => {
        return this.filterReviews().map(review => <ReviewFeedCard review={review} key={review.id}/>)

    }
    
    render() {
        console.log('passing props', this.props)
        return (
            this.renderReviewCards()
        )
    }
}

export default FeedContainer