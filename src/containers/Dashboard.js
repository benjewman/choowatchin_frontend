import React from 'react'
import { Header } from 'semantic-ui-react'
// import { connect } from 'react-redux'
import WithAuth from '../components/WithAuth'
// import { loginSuccess } from '../actions/index'

class Dashboard extends React.Component {
    
    render() {
        return (
            <Header style={{marginTop: '1em', marginLeft: '1em'}} as="h1">Dashboard</Header>
        )
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         setUser: user => dispatch(loginSuccess(user))
//     }
// }

export default WithAuth(Dashboard)