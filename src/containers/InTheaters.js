import React from 'react'
import { Grid } from 'semantic-ui-react'
import WithAuth from '../components/WithAuth'
import MovieCard from '../components/MovieCard'

class InTheaters extends React.Component {
    constructor() {
        super()
        this.state = {
            movies: [],
            // something to keep track of what 
            // page to fetch from
            // start out on 2 because the first fetch is automatic
            fetchPage: 2
        }
    }
    
    componentDidMount() {
        // fetch from TMDB for now playing 
        // just the first page for now
        // implement infinite scroll after MVP
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US')
        .then(resp => resp.json())
        .then(movies => this.setState({ movies: movies.results }))
    }

    routeToMoviePage = (movie) => {
        this.props.history.push(`/movies/${movie.id}`)
    }

    renderMovies = () => {
        return this.state.movies.map(movie => <MovieCard movie={movie} key={movie.id} />)
    }
    
    render() {
        console.log(this.state.movies)
        return (
            <div>
                <h1 style={{textAlign: 'center', marginTop: '1em', marginBottom: '1em'}}>Check Out These Movies In Theaters</h1>
            <Grid columns={6} style={{marginLeft: '0.25em'}}>
                {this.renderMovies()}
            </Grid>
            </div>
        )
    }
}


export default WithAuth(InTheaters)