
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { withRouter } from 'react-router-dom';
import NavLogin from './NavLogin';
import NavSignup from './NavSignup';
import NavDefault from './NavDefault';
import { connect } from 'react-redux';

const Navbar = (props) => {

    const renderNav = () => {
        switch (props.history.location.pathname) {
            case '/login':
                return <NavLogin />
            case '/signup':
                return <NavSignup />
            default:
                return <NavDefault />

                
        }
    }

    const inOrOutNav = () => {
        if (props.user) {
            return <NavDefault />
        } else {
            // return the navbar with the appropriate options
        }
    }

    return (
        <div>
            {renderNav()}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Navbar))

