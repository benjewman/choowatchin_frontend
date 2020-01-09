import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../actions/index'

export default function WithAuth(WrappedComponent) {
     class Auth extends React.Component {
        
        handleFetch = user => {
            if (user.error && this.props.history.location.pathname !== '/login') {
                this.props.history.push('/login')
            } else {
                this.props.setUser(user)
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
                console.log('foo')
                const reqObj = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
    
                fetch('http://localhost:3000/current_user', reqObj)
                .then(resp => resp.json())
                .then(user => this.handleFetch(user))
            }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            setUser: user => dispatch(setUser(user))
        }
    }
    


    return connect(null, mapDispatchToProps)(Auth)

}


