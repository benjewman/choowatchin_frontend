import React from 'react'
import { Header, Grid, Image } from 'semantic-ui-react'
// import { connect } from 'react-redux'
import WithAuth from '../components/WithAuth'
// import { loginSuccess } from '../actions/index'

class Dashboard extends React.Component {
    
    componentDidMount() {
        
    }
    
    render() {
        return (
            <Grid columns={3} divided>
                <Grid.Column width={3}>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                </Grid.Column>

                <Grid.Column width={9}>
                    {/*  fetch user's friends and their reviews */}
                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Grid.Column>

                <Grid.Column width={3}>
                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                </Grid.Column>
            </Grid>
        )
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         setUser: user => dispatch(loginSuccess(user))
//     }
// }

export default WithAuth(Dashboard)