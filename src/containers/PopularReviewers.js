import React from 'react'
import { Card } from 'semantic-ui-react'
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

    renderUserCard = user => {
        return (
            <Card>
                
            </Card>
        )
    }

    renderTopFiveCards = () => {
        this.props.topFive.map(user => this.renderUserCard(user))
    }

    render() {
        console.log(this.state)
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