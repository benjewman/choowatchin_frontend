import React from 'react'
import { connect } from 'react-redux'
import { setUser, setFollowedReviews, setLeaders } from '../actions/index'
import { withRouter } from 'react-router-dom'
import { url } from '../urls.js'

export default function WithAuth(WrappedComponent) {
     class Auth extends React.Component {
        
        handleFetch = userInfo => {
            
            if (!userInfo.error) {
                console.log(userInfo)
                this.props.setUser(userInfo)
                this.props.setLeaders(userInfo.leaders)
                //  dispatch followed reviews to store
                this.props.setFollowedReviews(userInfo.followed_reviews)
            }
        }
        
        componentDidMount() {
            const token = localStorage.getItem('token')
            
            if (token) {
                const reqObj = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                }
            }
    
                fetch(`${url}/current_user`, reqObj)
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


