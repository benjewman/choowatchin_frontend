import React from 'react'
import WithAuth from './WithAuth'
import { Grid, Image, Button, Icon } from 'semantic-ui-react'

class MovieShow extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            movie: {},
            movieDetails: {}
        }
    }
    
    componentDidMount() {
        // use the id in params
        // to fetch from TMDB
        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US`)
        .then(resp => resp.json())
        .then(movie => {
            this.setState({movie: movie })
            fetch(`http://www.omdbapi.com/?apikey=49f89f6c&i=${movie.imdb_id}`)
            .then(resp => resp.json())
            .then(movie => this.setState({movieDetails: movie}))
        })
    }

    renderMoviePoster = () => {
        return (
            <Grid.Column>
                <Image src={'http://image.tmdb.org/t/p/w780' + this.state.movie.poster_path}/>
            </Grid.Column>
        )
    }

    renderTitleAndPlot = () => {
        return (
            <Grid.Column width={7}>
                <Grid.Row style={{marginTop: '2em'}}>
                    <h1 style={{fontSize: '50px', textAlign: 'center', textDecorationLine: 'underline'}}>{this.state.movie.title}</h1>
                </Grid.Row>
                <Grid.Row style={{marginTop: '3em'}}>
                    <h2 style={{fontSize: '30px', textAlign: 'center', fontStyle: 'italic'}}>{this.state.movie.tagline}</h2>
                </Grid.Row>
                <Grid.Row style={{marginTop: '4em'}}>
                    <p style={{fontSize: '20px'}}><strong>Plot: </strong>{this.state.movie.overview}</p>
                </Grid.Row>
                <Grid.Row style={{marginTop: '8em', textAlign: 'center'}}>
                    <Button>Create Review <Icon name="comment alternate outline"/></Button>
                </Grid.Row>
            </Grid.Column>
        )
    }

    renderDetail = (category) => {
        // DRY code alert!!!
        return (
            <Grid.Row>
                <h3 style={{textAlign: 'left', marginTop: '2em'}}>{category}:</h3>
                <p style={{textAlign: 'right'}}>{this.state.movieDetails[category]}</p>
            </Grid.Row>
        )
    }

    movieCategories = ['Director', 'Actors', 'Genre', 'Released', 'Rated', 'Runtime']

    renderMovieDetails = () => {
        return (
            <Grid.Column style={{marginTop: '3em'}} width={3}>
                {/* <p style={{fontSize: '20px', textAlign: 'right', marginRight: '1em'}}><strong>Release Date: </strong>{this.state.movieDetails.Released}</p> */}
                {this.movieCategories.map(category => this.renderDetail(category))}
            </Grid.Column>
        )
    }

    // might wanna refactor code below
    render() {
        console.log(this.state)
        return (
            <Grid style={{marginLeft: '0.5em'}} columns={3}>
                {this.renderMoviePoster()}
                {this.renderTitleAndPlot()}
                {/* Add dividers to the column below */}
                {this.renderMovieDetails()}
            </Grid>
        )
    }
} 

export default WithAuth(MovieShow)

