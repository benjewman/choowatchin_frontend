import React from 'react'

class EditReview extends React.Component {
    componentDidMount() {
        console.log(this.props)
        fetch(`http://localhost:3000/reviews/${this.props.match.params.id}`)
        .then(resp => resp.json())
        .then(message => console.log(message))
    }
    
    render() {
        return (
            <h1>Edit Review</h1>
        )
    }
}

export default EditReview