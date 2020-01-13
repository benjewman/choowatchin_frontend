import React from 'react'
import { Grid, Image, Card } from 'semantic-ui-react'
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
        return this.state.movies.map(movie => {
            return (
                {/* <Grid.Column>
                    <Card>
                        <Image onClick={() => this.routeToMoviePage(movie)} src={'http://image.tmdb.org/t/p/w185' + movie.poster_path}/>
                        <Card.Content>
                            <Card.Header>
                                {movie.title}
                            </Card.Header>
                        </Card.Content>
                    </Card>
                </Grid.Column> */}
                <MovieCard movie={movie} key={movie.id} />
            )
        })
    }
    
    render() {
        console.log(this.state.movies)
        return (
            <Grid columns={6} divided style={{marginLeft: '1.5em'}}>
                {this.renderMovies()}
            </Grid>
        )
    }
}


export default WithAuth(InTheaters)