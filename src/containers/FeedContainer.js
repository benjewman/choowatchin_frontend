import React from 'react';
import ReviewFeedCard from '../components/ReviewFeedCard';
import { url } from '../urls.js';
import MediaQuery from 'react-responsive';
import ReviewFeedMobile from '../components/ReviewFeedMobile';


class FeedContainer extends React.Component {
    
    _isMounted = false;
    
    constructor() {
        super()
        this.state = {
            reviews: []
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        if (!this.props.user) {
            fetch(`${url}/reviews`)
            .then(resp => resp.json())
            .then(data => {
                if (this._isMounted === true) {
                    this.setState({reviews: data});
                }
            })
        } else {
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
                if (this._isMounted === true) {
                    this.setState({reviews: data});
                }
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
                    if (this._isMounted === true) {
                    this.setState({reviews: data});
                }
                })
            } else {
                fetch(`${url}/reviews`)
                .then(resp => resp.json())
                .then(data => {
                    if (this._isMounted === true) {
                    this.setState({reviews: data});
                }
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

    renderMobileReviewCards = () => {
        if (this.filterReviews().length < 1) {
            return <h4 style={{textAlign: 'center'}}>Follow Users to See Their Reviews</h4>
        } else {
            return this.filterReviews().map(review => <ReviewFeedMobile style={{display: 'block'}} review={review} key={review.id}/>)
        }
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