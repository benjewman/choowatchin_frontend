import React from 'react'
import { connect } from 'react-redux'
import { setUser, setFollowedReviews, setLeaders } from '../actions/index'
import { withRouter } from 'react-router-dom'

export default function WithAuth(WrappedComponent) {
     class Auth extends React.Component {
        
        handleFetch = userInfo => {
            if (userInfo.error && this.props.history.location.pathname !== '/login') {
                this.props.history.push('/login')
            } else if (!userInfo.error) {
                console.log(userInfo)
                this.props.setUser(userInfo.user)
                this.props.setLeaders(userInfo.leaders)
                //  dispatch followed reviews to store
                this.props.setFollowedReviews(userInfo.followed_reviews)
                if (this.props.history.location.pathname === '/login') {
                    this.props.history.push('/home')
                }
            }
        }
        
        componentDidMount() {
            const token = localStorage.getItem('token')
    
            if (!token && this.props.history.location.pathname !== '/login') {
                // console.log(this.props.history.location.pathname)
                this.props.history.push('/login')
            } else if (token) {
                const reqObj = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
    
                fetch('http://localhost:3000/current_user', reqObj)
                .then(resp => resp.json())
                .then(userInfo => this.handleFetch(userInfo))
            }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            setUser: user => dispatch(setUser(user)),
            // use action to dispatch followed users to store
            setFollowedReviews: followedReviews => dispatch(setFollowedReviews(followedReviews)),
            setLeaders: leaders => dispatch(setLeaders(leaders))
        }
    }
    


    return connect(null, mapDispatchToProps)(withRouter(Auth))

}


