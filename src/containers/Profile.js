import React from 'react'

class Profile extends React.Component {

    componentDidMount() {
        console.log(this.props)
        fetch(`http://localhost:3000/users/${this.props.match.params.id}`)
        .then(resp => resp.json())
        .then(data => console.log(data))
    }
    
    render() {
        return (
            <h1>Profile</h1>
        )
    }
}

export default Profile