import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const cardStyle = {
    border: 'thin dotted black',
    marginLeft: '0.5em'
}

function UserCard(props) {
    return (
         <Grid columns={2}>
            <Grid.Column>
                <h4>{props.user.full_name}</h4>
                {/* make username clickable */}
                <h5>@{props.user.username}</h5>
            </Grid.Column>
            <Grid.Column>
                <Image src={props.user.pic} wrapped  size="tiny"/>
                {/* <div><Icon name='user' />{this.props.followerCountArray[index]} Followers</div> */}
            </Grid.Column>
        </Grid>
    )
}

export default UserCard