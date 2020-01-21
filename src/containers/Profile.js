import React from 'react'
import { Grid, Card, Image, Button } from 'semantic-ui-react'
// import ReviewCard from '../components/ReviewCard'
import ReviewFeedCard from '../components/ReviewFeedCard'
import WithAuth from '../components/WithAuth'
import { connect } from 'react-redux'
import { addLeader, removeLeader } from '../actions/index'

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
                user: data,
                reviews: data.reviews.reverse()
            })
        })
    }

    handleEditProfile = () => {
        this.props.history.push(`/profile/${this.state.user.id}/edit`)
    }

    renderEditButton = () => {
        return <Button onClick={this.handleEditProfile} content='Edit Profile' />
    }

    followFetch = (postOrDelete) => {
        const fetchObj = {
            method: `${postOrDelete}`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ leader_id: this.state.user.id, follower_id: this.props.user.id})
        }
        
        if (postOrDelete === 'POST') {
            fetch('http://localhost:3000/follows', fetchObj)
            .then(resp => resp.json())
            .then(leader => {
                this.props.addLeader(leader)
            })
        } else {
            // fetch to 1 arbitrarily because delete has to go to an id
            fetch(`http://localhost:3000/follows/1`, fetchObj)
            .then(resp => resp.json())
            .then(data => {
                this.props.removeLeader(data.leader_id)
            })
        }
    }

    renderFollowButton = () => {
        if (this.props.leaders && this.props.leaders.find(leader => leader.id === this.state.user.id)) {
            return (
                 <Button onClick={() => this.followFetch('DELETE')} animated>
                    <Button.Content visible>Following</Button.Content>
                    <Button.Content hidden>Unfollow</Button.Content>
                </Button>
            )
        } else {
            return (
                <Button onClick={() => this.followFetch('POST')}>
                    <Button.Content>Follow</Button.Content>
                </Button>
            )
        }
    }

    renderProfileCard = () => {
        return (
            <Grid.Column width={6} style={{marginLeft: '5em', marginTop: '2em'}}>
                <Card>
                    <Image src={this.state.user.avatar} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{this.state.user.full_name}</Card.Header>
                        <Card.Meta>
                            <span>@{this.state.user.username}</span>
                        </Card.Meta>
                    </Card.Content>
                </Card>
                { this.props.user && this.props.user.id === this.state.user.id ? this.renderEditButton() : this.renderFollowButton() }
            </Grid.Column>
        )
    }

    renderReviews = () => {
        return (
            <Grid.Column style={{marginTop: '2em'}}>
                <h2 style={{textAlign: 'center', marginBottom: '2em'}}>Reviews</h2>
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
        user: state.user,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addLeader: leader => dispatch(addLeader(leader)),
        removeLeader: leader_id => dispatch(removeLeader(leader_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Profile))