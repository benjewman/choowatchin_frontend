import React from 'react'
import WithAuth from './WithAuth'
import { Grid, Image, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import AwfulStamp from '../awful_stamp2.png'
import BadStamp from '../bad_stamp.jpg'
import MehStamp from '../meh_stamp.jpeg'
import GoodStamp from '../good_stamp.jpeg'
import MustWatchStamp from '../must_watch_stamp.jpeg'
import { url } from '../urls.js'
import MediaQuery from 'react-responsive';

const cardStyle = {
    border: 'thin dotted black',
    marginLeft: '0.5em'
}

class MovieShowMobile extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            movie: {},
            movieDetails: {},
            reviewToggle: undefined,
            friendReviews: [],
            allReviews: []
        }
    }

    // how to render the reviews we have in state
    
    componentDidMount() {
        // use the id in params
        // to fetch from TMDB
        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US`)
        .then(resp => resp.json())
        .then(movie => {
            this.setState({movie: movie })
            fetch(`https://www.omdbapi.com/?apikey=49f89f6c&i=${movie.imdb_id}`)
            .then(resp => resp.json())
            .then(movie => this.setState({movieDetails: movie}))

            fetch(`${url}/shows/${movie.id}`)
            .then(resp => resp.json())
            .then(show => {
                if (show.error) {
                    return null
                } else if (this.props.followedReviews) {
                    this.setState({allReviews: show.reviews, friendReviews: show.reviews.filter(review => this.props.followedReviews.map(review => review.id).includes(review.id))})
                } else {
                    this.setState({allReviews: show.reviews})
                }
            })
        })
    }

    renderMoviePoster = () => {
        return (
            <Grid.Column>
                <Image src={'http://image.tmdb.org/t/p/w780' + this.state.movie.poster_path} style={{width: '80vw', marginLeft: 'auto', marginRight: 'auto'}}/>
            </Grid.Column>
        )
    }

    routeToCreate = () => {
        this.props.history.push(`/reviews/movies/${this.state.movie.id}/new`)
    }
    
    renderCreateButton = () => {
        if (this.props.user) {
            return (
                <Grid.Row style={{marginTop: '2vh', textAlign: 'center'}}>
                    <Button onClick={this.routeToCreate}>Create Review <Icon name="comment alternate outline"/></Button>
                </Grid.Row>
            )
        }
    }

    renderTitleAndPlot = () => {
        return (
            <Grid.Column className="fixColumn" >
                <Grid.Row >
                    <p style={{fontSize: '3vw', marginLeft: 'auto', marginRight: 'auto', width: '100vw', textAlign: 'center'}}><strong>Plot: </strong>{this.state.movie.overview}</p>
                </Grid.Row>
                {this.renderCreateButton()}
            </Grid.Column>
        )
    }

    // might wanna refactor code below

    // adjust poster size so it fits properly on each device
    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <Grid >
                    <Grid.Row>
                        <Grid.Column >
                            <h1 style={{fontSize: '10vw', textAlign: 'center', textDecorationLine: 'underline', width: '100vw'}}>{this.state.movie.title}</h1>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column>
                            <h2 style={{fontSize: '6vw', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', fontStyle: 'italic', width: '100vw'}}>{this.state.movie.tagline}</h2>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                            {this.renderMoviePoster()}
                    </Grid.Row>
                    <Grid.Row>
                        {this.renderTitleAndPlot()}
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        followedReviews: state.followedReviews,
        user: state.user
    }
}

export default connect(mapStateToProps)(WithAuth(MovieShowMobile))