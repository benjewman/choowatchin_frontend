import React from 'react'
import { Grid, Card, Image, Button } from 'semantic-ui-react'
// import ReviewCard from '../components/ReviewCard'
import ReviewFeedCard from '../components/ReviewFeedCard'
import WithAuth from '../components/WithAuth'
import { connect } from 'react-redux'

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            reviews: []
        }
    }
    componentDidMount() {
        console.log(this.props)
        fetch(`http://localhost:3000/users/${this.props.match.params.id}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.setState({
                user: data.user,
                reviews: data.user_reviews
            })
        })
    }

    handleEditProfile = () => {
        this.props.history.push(`/profile/${this.state.user.id}/edit`)
    }

    renderProfileCard = () => {
        return (
            <Grid.Column width={6} style={{marginLeft: '5em', marginTop: '2em'}}>
                <Card>
                    <Image src={this.state.user.pic} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{this.state.user.full_name}</Card.Header>
                        <Card.Meta>
                            <span>@{this.state.user.username}</span>
                        </Card.Meta>
                    </Card.Content>
                </Card>
                { this.props.user && this.props.user.id === this.state.user.id ? <Button onClick={this.handleEditProfile} content='Edit Profile' /> : null }
            </Grid.Column>
        )
    }

    renderReviews = () => {
        return (
            <Grid.Column style={{marginTop: '2em'}}>
                <h2 style={{textAlign: 'center', marginBottom: '2em'}}>My Reviews</h2>
                {this.state.reviews.map(review => <ReviewFeedCard noProfPic={true} review={review} key={review.id} />)}
            </Grid.Column>
        )
    }
    
    render() {
        return (
            <Grid columns={2}>
                {this.renderProfileCard()}
                {this.renderReviews()}
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(WithAuth(Profile))