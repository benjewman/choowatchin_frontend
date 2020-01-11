import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'


class PopularReviewers extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    
    componentDidMount() {
        // fetch below should work in dashboard
        
        // fetch('http://localhost:3000/topfive')
        // .then(resp => resp.json())
        // .then(topFiveInfo => this.setState(topFiveInfo))
    }

    renderUserCard = (user, index) => {
        return (
            <Card style={{maxWidth: '11em'}}>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{user.full_name}</Card.Header>
                    {/* Make username clickable */}
                    <Card.Description>@{user.username}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Card.Description>
                        <Icon name='user' />
                        {this.props.followerCountArray[index]} Followers
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }

    renderTopFiveCards = () => {
        return this.props.topFive.map((user, index)  => this.renderUserCard(user, index))
    }

    render() {
        console.log(this.props)
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

export default connect(mapStateToProps, null)(PopularReviewers)