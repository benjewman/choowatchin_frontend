import React from 'react';
import { Image, Icon, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setTopFive } from '../actions/index';
import { url } from '../urls.js';
import PopularUserCard from '../components/PopularUserCard';

const cardStyle = {
    border: 'thin dotted black',
    marginLeft: '0.5em'
}

class PopularReviewers extends React.Component {
    componentDidMount() {
        fetch(`${url}/topfive`)
        .then(resp => resp.json())
        .then(topFiveInfo => this.props.setTopFive(topFiveInfo))
    }

    renderTopFiveCards = () => {
        return this.props.topFive.map((user)  => <PopularUserCard user={user} key={user.id} />)
    }

    render() {
        console.log('Top Five props',this.props)
        return (
            <div>
                <h1>Popular Reviewers</h1>
                {this.props.topFive ? this.renderTopFiveCards() : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        topFive: state.topFive,
        followerCountArray: state.followerCountArray
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTopFive: topFive => dispatch(setTopFive(topFive))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularReviewers)






































 // {/* <Card style={{maxWidth: '10em', marginLeft: '8em'}}>
            //     <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            //     <Card.Content>
            //         <Card.Header>{user.full_name}</Card.Header>
            //         {/* Make username clickable */}
            //         <Card.Description>@{user.username}</Card.Description>
            //     </Card.Content>
            //     <Card.Content extra>
            //         <Card.Description>
            //             <Icon name='user' />
            //             {this.props.followerCountArray[index]} Followers
            //         </Card.Description>
            //     </Card.Content>
            // </Card> */}