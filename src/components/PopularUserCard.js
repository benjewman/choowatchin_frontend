import React from 'react';
import { Image, Icon, Grid } from 'semantic-ui-react';

function PopularUserCard({ user }) {
    const cardStyle = {
        border: 'thin dotted black',
        marginLeft: '0.5em'
    }

    return (
        <Grid style={cardStyle} columns={2}>
            <Grid.Column>
                <h4>{user.full_name}</h4>
                {/* make username clickable */}
                <a href={'/profile/' + user.id}>@{user.username}</a>
            </Grid.Column>
            <Grid.Column>
                <Image src={user.avatar} wrapped  size="tiny"/>
                <div><Icon name='user' />{user.followers.length} Followers</div>
            </Grid.Column>
        </Grid>
    )
}

export default PopularUserCard;

