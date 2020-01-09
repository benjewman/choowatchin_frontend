import React from 'react'

export default function Authorize(WrappedComponent) {
    return class extends React.Component {
        // constructor(props) {
        //     super(props)
        // }

        handleFetch = user => {
            if (user.error) {
                this.props.history.push('/login')
            } else {
                this.props.setUser(user)
            }
        }
        
        componentDidMount() {
            console.log('We got to authorize')
            const token = localStorage.getItem('token')
    
            if (!token) {
                this.props.history.push('/login')
            } else {
                const reqObj = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
    
                fetch('http://localhost:3000/current_user', reqObj)
                .then(resp => resp.json())
                // .then(user => user.error ? this.props.history.push('/login') : this.props.setUser(user))
                .then(user => this.handleFetch(user))
            }
        }

        render() {
            return <WrappedComponent />
        }
    }

}

