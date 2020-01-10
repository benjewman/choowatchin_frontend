import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class ReviewFeedCard extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    componentDidMount() {
        fetch(`http://localhost:3000/reviews/${this.props.review.id}`)
        .then(resp => resp.json())
        .then(reviewInfo => {
            this.setState({
                reviewUser: reviewInfo.user,
                reviewShow: reviewInfo.show
            })
            // console.log('ReviewCard', reviewInfo)
            // fetch(`http://www.omdbapi.com/?apikey=49f89f6c&i=${reviewInfo.show.imdbID}`)
            // .then(resp => resp.json())
            // .then(show => this.setState({reviewShow: show}))
        })
    }

    renderCard = () => {
        return (
            <Card>
                <Image src={this.state.reviewShow.poster} />
            </Card>
        )
    }
    
    render() {
        console.log('review card state', this.state)
        return (
            this.state.reviewShow ? this.renderCard() : null
        )
    }
}

export default ReviewFeedCard