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

    componentDidMount() {
        if (!this.props.user) {
            console.log("No user");
            fetch(`${url}/reviews`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({reviews: data})
            })

        } else {
            console.log("User");
            const reqObj = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'UserId': `Bearer ${this.props.user.id}`
                }
            }
            fetch(`${url}/reviews`, reqObj)
            .then(resp => resp.json())
            .then(data => {
                this.setState({reviews: data})
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            if (this.props.user) {
                const reqObj = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'UserId': `Bearer ${this.props.user.id}`
                    }
                }
                fetch(`${url}/reviews`, reqObj)
                .then(resp => resp.json())
                .then(data => {
                    this.setState({reviews: data})
                })
            } else {
                fetch(`${url}/reviews`)
                .then(resp => resp.json())
                .then(data => {
                    this.setState({reviews: data})
                })
            }
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
        console.log('whats the state', this.state);
        return (
            this.renderReviewCards()
        )
    }
}

export default FeedContainer