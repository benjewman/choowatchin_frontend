import React from 'react'
import { Grid, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import WithAuth from '../components/WithAuth'
import FeedContainer from './FeedContainer'
import PopularReviewers from './PopularReviewers'
import { setTopFive } from '../actions/index'

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            filter: 'all'
        }
    }
    
    componentDidMount() {
        fetch('http://localhost:3000/topfive')
        .then(resp => resp.json())
        .then(topFiveInfo => this.props.setTopFive(topFiveInfo))
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.followedReviews !== this.props.followedReviews)
    // }

    filterShows = () => {
        switch (this.state.filter) {
            case 'just movies':
                return this.props.followedReviews.filter(review => review.medium === 'movies')
            case 'just series':
                return this.props.followedReviews.filter(review => review.medium === 'series')
            default:
                return this.props.followedReviews
        }
    }

    changeFilter = filter => {
        this.setState({filter: filter})
    }
    
    render() {
        console.log(this.props.followedReviews)
        return (
            <Grid columns={3} >
                <Grid.Column width={3}>
                    <Menu pointing vertical>
                        <Menu.Item
                        onClick={() => this.changeFilter('all')}
                        name='all'
                        active={this.state.filter === 'all'}
                        />
                        <Menu.Item
                        onClick={() => this.changeFilter('just movies')}
                        name='just movies'
                        active={this.state.filter === 'just movies'}
                        />
                        <Menu.Item
                        onClick={() => this.changeFilter('just series')}
                        name='just series'
                        active={this.state.filter === 'just series'}
                        /> 
                    </Menu>
                </Grid.Column>

                <Grid.Column width={9}>
                    <FeedContainer followedReviews={this.filterShows()}/>
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