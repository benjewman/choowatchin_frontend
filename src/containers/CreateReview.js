import React from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Image } from 'semantic-ui-react'
import WithAuth from '../components/WithAuth'

class CreateReview extends React.Component {
    constructor() {
        super()
        this.state = {
            show: {}
        }
    }
    
    componentDidMount() {
        if (this.props.match.params.medium === 'movies') {
            fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US`)
            .then(resp => resp.json())
            .then(movie => this.setState({ show: movie }))
        } else {
            fetch(`https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US`)
            .then(resp => resp.json())
            .then(series => this.setState({ show: series }))
        } 

    }

   renderPoster = () => {
       return (
            <Grid.Column style={{marginTop: '0.5em'}}>
                <Image src={'http://image.tmdb.org/t/p/w780' + this.state.show.poster_path}/>
            </Grid.Column>
       )
   }

    render() {
        console.log(this.state)
        return (
            // duct tape fix for centering this stupid header
            <Grid columns={3} centered>
                {this.renderPoster()}
                <Grid.Column>
                    <Header as="h1" style={{textAlign: 'center'}}>Create Review</Header>
                    
                </Grid.Column>
                <Grid.Column>

                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        reviewShow: state.reviewShow
    }
}

export default connect(mapStateToProps, null)(WithAuth(CreateReview))