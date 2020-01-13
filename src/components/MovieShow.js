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


    // might wanna refactor code below
    render() {
        console.log(this.state)
        return (
            <Grid style={{marginLeft: '0.5em'}} columns={3}>
                <Grid.Column>
                    <Image src={'http://image.tmdb.org/t/p/w780' + this.state.movie.poster_path}/>
                </Grid.Column>
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
                {/* Add dividers to the column below */}
                <Grid.Column style={{marginTop: '3em'}} width={3}>
                    {/* <p style={{fontSize: '20px', textAlign: 'right', marginRight: '1em'}}><strong>Release Date: </strong>{this.state.movieDetails.Released}</p> */}
                    <Grid.Row>
                        <h3 style={{textAlign: 'left'}}>Director:</h3>
                        <p style={{textAlign: 'right'}}>{this.state.movieDetails.Director}</p>
                    </Grid.Row>
                    <Grid.Row>
                        <h3 style={{textAlign: 'left', marginTop: '2em'}}>Actors:</h3>
                        <p style={{textAlign: 'right'}}>{this.state.movieDetails.Actors}</p>
                    </Grid.Row>
                    <Grid.Row>
                        <h3 style={{textAlign: 'left', marginTop: '2em'}}>Genres:</h3>
                        <p style={{textAlign: 'right'}}>{this.state.movieDetails.Genre}</p>
                    </Grid.Row>
                    <Grid.Row>
                        <h3 style={{textAlign: 'left', marginTop: '2em'}}>Release Date:</h3>
                        <p style={{textAlign: 'right'}}>{this.state.movieDetails.Released}</p>
                    </Grid.Row>
                    <Grid.Row>
                        <h3 style={{textAlign: 'left', marginTop: '2em'}}>Rated:</h3>
                        <p style={{textAlign: 'right'}}>{this.state.movieDetails.Rated}</p>
                    </Grid.Row>
                    <Grid.Row>
                        <h3 style={{textAlign: 'left', marginTop: '2em'}}>Runtime:</h3>
                        <p style={{textAlign: 'right'}}>{this.state.movieDetails.Runtime}</p>
                    </Grid.Row>
                    <Grid.Row>
                        <h3 style={{textAlign: 'left', marginTop: '2em'}}>Runtime:</h3>
                        <p style={{textAlign: 'right'}}>{this.state.movieDetails.Runtime}</p>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
} 

export default WithAuth(MovieShow)

