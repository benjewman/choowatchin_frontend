import React from 'react'
import { Card, Image, Grid, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AwfulStamp from '../awful_stamp2.png'
import BadStamp from '../bad_stamp.jpg'
import MehStamp from '../meh_stamp.jpeg'
import GoodStamp from '../good_stamp.jpeg'
import MustWatchStamp from '../must_watch_stamp.jpeg'
import { url } from '../urls.js'

class ReviewFeedCard extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    componentDidMount() {
        fetch(`${url}/reviews/${this.props.review.id}`)
        .then(resp => resp.json())
        .then(reviewInfo => {
            this.setState({
                reviewUser: reviewInfo.user,
                reviewShow: reviewInfo.show
            })
        })
    }

    routeToPage = () => {
        this.props.history.push(`/${this.state.reviewShow.medium}/${this.state.reviewShow.showId}`)
    }
    
    routeToUserPage = () => {
        this.props.history.push(`/profile/${this.state.reviewUser.id}`)
    }
    
    renderReviewUserCard = () => {
        return (
            <Card onClick={this.routeToUserPage} style={{maxWidth: '12em', marginLeft: '6em'}}>
                {/* Placeholder image for the user's prof pic */}
                <Image src={this.props.review.user.avatar} wrapped ui={false} />
                <Card.Content>
                    {/* Make username clickable */}
                    <Card.Header style={{fontSize: '15px'}}>@{this.state.reviewUser.username}</Card.Header>
                </Card.Content>
            </Card>
        )
    }

    renderStamp = () => {
        switch (this.props.review.stamp) {
            case 'Awful':
                return <Image src={AwfulStamp} />
            case 'Bad':
                return <Image src={BadStamp} />
            case 'Good':
                return <Image src={GoodStamp} />
            case 'Must Watch':
                return <Image src={MustWatchStamp} />
            default:
                return <Image src={MehStamp} />
        }
    }

    renderCard = () => {
        return (
            <Grid columns={2} style={{borderBottom: 'dotted red'}}>
                <Grid.Column width={5}>
                    <Card onClick={this.routeToPage}>
                        <Card.Content>
                            <Image src={'http://image.tmdb.org/t/p/w780' + this.state.reviewShow.poster}/>
                        </Card.Content>
                        <Card.Content>
                            <Card.Header style={{textAlign: 'center'}}>{this.state.reviewShow.title}</Card.Header>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={10} >
                    <Grid.Row style={{marginTop: '3em'}}>
                        <div style={{border: 'thin dotted black'}}>
                            <h3 style={{textAlign: 'center', marginTop: '1em', marginBottom: '1em'}}>"{this.props.review.content}"</h3>
                            <h5 style={{textAlign: 'center', marginTop: '1em', marginBottom: '1em'}}>-{this.state.reviewUser.full_name}</h5>
                        </div>
                    </Grid.Row>
                    <Grid.Row style={{marginTop: '8em'}}>
                        <Grid columns={2}>
                            <Grid.Column>
                                {/* <h3>Stamp: {this.props.review.stamp}</h3> */}
                                {this.renderStamp()}
                            </Grid.Column>
                            <Grid.Column floated="right">
                                {this.props.noProfPic ? this.renderEditButton() : this.renderReviewUserCard()}
                            </Grid.Column>
                        </Grid>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }

    routeToEdit = () => {
        this.props.history.push(`/reviews/${this.props.review.id}/edit`)
    }

    renderEditButton = () => {
        if (this.props.user && this.props.user.id === this.props.review.user.id) {
            return (
                <Button onClick={this.routeToEdit} content='Edit Review' />
            )
        }
    }
    
    render() {
        console.log(this.props)
        return (
            this.state.reviewShow ? this.renderCard() : null
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(ReviewFeedCard))