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
}

export default connect(mapStateToProps, null)(WithAuth(DashMobile));