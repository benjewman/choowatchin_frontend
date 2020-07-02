import React from 'react';
import { Grid, Card, Image, Button } from 'semantic-ui-react';
// import ReviewCard from '../components/ReviewCard'
import ReviewFeedCard from '../components/ReviewFeedCard';
import WithAuth from '../components/WithAuth';
import { connect } from 'react-redux';
import { addLeader, removeLeader } from '../actions/index';
import { url } from '../urls.js';
import FeedContainer from './FeedContainer';
import ReviewFeedMobile from '../components/ReviewFeedMobile';

class ProfileMobile extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            reviews: [],
            filter: 'all'
        }
    }
    componentDidMount() {
        console.log(this.props)
        fetch(`${url}/users/${this.props.match.params.id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                user: data,
                reviews: data.reviews.reverse()
            })
        })
    }

    componentDidUpdate(prevProps) {
        // when on someone's profile and then go to my profile
        // componentdidmount will not run again so we need to make a new fetch
        if (this.props.match.params.id !== prevProps.match.params.id) {
            fetch(`${url}/users/${this.props.match.params.id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                user: data,
                reviews: data.reviews.reverse()
            })
        })
        }
    }

    handleEditProfile = () => {
        this.props.history.push(`/profile/${this.state.user.id}/edit`)
    }

    renderEditButton = () => {
        return <Button className='marginCenter' onClick={this.handleEditProfile} content='Edit Profile' />
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
            fetch(`${url}/follows`, fetchObj)
            .then(resp => resp.json())
            .then(leader => {
                this.props.addLeader(leader)
            })
        } else {
            // fetch to 1 arbitrarily because delete has to go to an id
            fetch(`${url}/follows/1`, fetchObj)
            .then(resp => resp.json())
            .then(data => {
                this.props.removeLeader(data.leader_id)
            })
        }
    }

    renderFollowButton = () => {
        if (this.props.leaders && this.props.leaders.find(leader => leader.id === this.state.user.id)) {
            return (
                 <Button className='marginCenter' onClick={() => this.followFetch('DELETE')} animated>
                    <Button.Content visible>Following</Button.Content>
                    <Button.Content hidden>Unfollow</Button.Content>
                </Button>
            )
        } else {
            return (
                <Button className='marginCenter' onClick={() => this.followFetch('POST')}>
                    <Button.Content>Follow</Button.Content>
                </Button>
            )
        }
    }

    userCondition = () => {
        if (this.props.user) {
            if (this.props.user.id === this.state.user.id) {
                return this.renderEditButton();
            } else {
                return this.renderFollowButton();
            }
        } 
    }

    renderProfileCard = () => {
        return (
            <Card style={{height: 'auto', width: '70vw', marginLeft: 'auto', marginRight: 'auto'}}>
                <Image src={this.state.user.avatar} wrapped ui={false}/>
                <Card.Content>
                    <Card.Header>{this.state.user.full_name}</Card.Header>
                    <Card.Meta>
                        <span>@{this.state.user.username}</span>
                    </Card.Meta>
                </Card.Content>
            </Card>
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

    renderProfileReviews = () => {
        return this.state.reviews.map(review => <ReviewFeedMobile noProfPic={true} style={{display: 'block'}} review={review} key={review.id}/>)
    }
    
    render() {
        console.log('PROPS', this.props);
        return ( 
            <Grid>
                <Grid.Row>
                    {this.renderProfileCard()}
                </Grid.Row>
                {this.userCondition()}
                <div className='marginCenter' style={{marginTop: '2vh'}}>
                    <h3 style={{textAlign: 'center'}}>User Reviews</h3>
                    {this.renderProfileReviews()}
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(ProfileMobile))