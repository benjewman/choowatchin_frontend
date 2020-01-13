import React from 'react'
import { connect } from 'react-redux'

class CreateReview extends React.Component {
    render() {
        return (
            <h1>Create Review</h1>
        )
    }
}

const mapStateToProps = state => {
    return {
        reviewMovie: state.reviewShow
    }
}

export default connect(mapStateToProps, null)(CreateReview)