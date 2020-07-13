import React from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import WithAuth from '../components/WithAuth';
import FeedContainer from './FeedContainer';

class DashMobile extends React.Component {
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
                <div className='marginCenter' style={{marginTop: '5vh'}}>
                    <h3 style={{textAlign: 'center'}} className="marginCenter">Reviews in Your Network</h3>
                    <FeedContainer filter={this.state.filter} user={this.props.user} />
                </div>
            )
        } else {
            return (
            <div className='detailScroll mobileFeed'>
                <h3 style={{textAlign: 'center'}}>Recent Reviews</h3>
                <FeedContainer filter={this.state.filter} />
            </div>
            )
        }
    }

    render() {
        return (
            this.recentOrNetworkReviews()
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(WithAuth(DashMobile));