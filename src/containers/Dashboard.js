import React from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import WithAuth from '../components/WithAuth';
import FeedContainer from './FeedContainer';
import PopularReviewers from './PopularReviewers';


class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            filter: 'all'
        }
    }

    changeFilter = filter => {
        this.setState({filter: filter})
    }

    recentOrNetworkReviews = () => {
        if (this.props.user) {
            return (
                <Grid.Column className='detailScroll'  width={9}>
                    <h3 style={{textAlign: 'center'}}>Reviews in Your Network</h3>
                    <FeedContainer filter={this.state.filter} user={this.props.user} />
                </Grid.Column>
            )
        } else {
            return (
            <Grid.Column className='detailScroll'  width={9}>
                <h3 style={{textAlign: 'center'}}>Recent Reviews</h3>
                <FeedContainer filter={this.state.filter} />
            </Grid.Column>
            )
        }
    }

    render() {
        return (
            <Grid className="showContainer" columns={3} >
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

                {this.recentOrNetworkReviews()}

                <Grid.Column style={{marginLeft: '3.25em'}} floated="right" width={3} >
                    <PopularReviewers />
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(WithAuth(Dashboard))