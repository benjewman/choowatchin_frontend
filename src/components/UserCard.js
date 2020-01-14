import React from 'react'
import { Grid, Image, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addLeader } from '../actions/index'

function UserCard(props) {

    const followFetch = (postOrDelete) => {
        const fetchObj = {
            method: `${postOrDelete}`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ leader_id: props.friend.id, follower_id: props.user.id})
        }
        
        if (postOrDelete === 'POST') {
            fetch('http://localhost:3000/follows', fetchObj)
            .then(resp => resp.json())
            // need to rerender page after that 
            .then(leader => {
                props.addLeader(leader)
                props.addFriend(leader)
            })
        } else {
            // fetch delete needs to go to a follow id
        }
    }
    
    const renderFollowingButton = () => {
        return (
            <Button onClick={() => followFetch('DELETE')} animated>
                <Button.Content visible>Following</Button.Content>
                <Button.Content hidden>Unfollow</Button.Content>
            </Button>
        )
    }

    const renderFollowButton = () => {
        return <Button onClick={() => followFetch('POST')} content='Follow' />
    }
    
    return (
         <Grid columns={2}>
            <Grid.Column>
                <h4>{props.friend.full_name}</h4>
                {/* make username clickable */}
                <h5>@{props.friend.username}</h5>
            </Grid.Column>
            <Grid.Column>
                <Image src={props.friend.pic} wrapped  size="tiny"/>
                 {/* conditionally render button depending on if user follows this user  */}
                 {props.leaders.find(leader => leader.id === props.friend.id) ? renderFollowingButton() : renderFollowButton()}
            </Grid.Column>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        leaders: state.leaders,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addLeader: leader => dispatch(addLeader(leader))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard)