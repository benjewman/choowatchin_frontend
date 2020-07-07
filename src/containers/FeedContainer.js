import React from 'react';
import ReviewFeedCard from '../components/ReviewFeedCard';
import { url } from '../urls.js';
import MediaQuery from 'react-responsive';
import ReviewFeedMobile from '../components/ReviewFeedMobile';


class FeedContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            reviews: []
        }
    }

    abortController = new AbortController();

    componentDidMount() {
        if (!this.props.user) {
            console.log("No user");
            fetch(`${url}/reviews`, { signal: this.abortController.signal })
            .then(resp => resp.json())
            .then(data => {
                this.setState({reviews: data})
            })

        } else {
            console.log("User");
            const reqObj = {
                signal: this.abortController.signal,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'UserId': `Bearer ${this.props.user.id}`
                }
            }
            fetch(`${url}/reviews`, reqObj)
            .then(resp => resp.json())
            .then(data => {
                this.setState({reviews: data});
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            if (this.props.user) {
                const reqObj = {
                    signal: this.abortController.signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'UserId': `Bearer ${this.props.user.id}`
                    }
                }
                fetch(`${url}/reviews`, reqObj)
                .then(resp => resp.json())
                .then(data => {
                    this.setState({reviews: data});
                })
            } else {
                fetch(`${url}/reviews`, {signal: this.abortController.signal})
                .then(resp => resp.json())
                .then(data => {
                    this.setState({reviews: data});
                })
            }
        } 
    }

    componentWillUnmount() {
        this.abortController.abort();
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

    renderMobileReviewCards = () => {
        return this.filterReviews().map(review => <ReviewFeedMobile style={{display: 'block'}} review={review} key={review.id}/>)
    }
    
    render() {
        return (
            <React.Fragment>
                <MediaQuery minDeviceWidth={1224}>
                    {this.renderReviewCards()}
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1224}>
                    {this.renderMobileReviewCards()}
                </MediaQuery>
            </React.Fragment>

        )
    }
}

export default FeedContainer;