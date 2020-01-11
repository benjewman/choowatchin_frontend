import React from 'react'
import { Grid, Image, Menu, Sticky } from 'semantic-ui-react'
import { connect } from 'react-redux'
import WithAuth from '../components/WithAuth'
import FeedContainer from './FeedContainer'
import PopularReviewers from './PopularReviewers'
import { setTopFive } from '../actions/index'

class Dashboard extends React.Component {
    
    componentDidMount() {
        fetch('http://localhost:3000/topfive')
        .then(resp => resp.json())
        .then(topFiveInfo => this.props.setTopFive(topFiveInfo))
    }
    
    render() {
        return (
            <Grid columns={3} >
                <Grid.Column width={3}>
                    <Menu pointing vertical>
                        <Menu.Item
                        name='all'
                        active={true}
                        />
                        <Menu.Item
                        name='just movies'
                        active={false}
                        />
                        <Menu.Item
                        name='just series'
                        active={false}
                        /> 
                    </Menu>
                </Grid.Column>

                <Grid.Column width={9}>
                    <FeedContainer followedReviews={this.props.followedReviews}/>
                </Grid.Column>

                <Grid.Column floated="right" width={3} >
                    <PopularReviewers />
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        followedReviews: state.followedReviews
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTopFive: topFive => dispatch(setTopFive(topFive.top_five, topFive.follower_count_array))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Dashboard))