import React from 'react'
import { Grid } from 'semantic-ui-react'
import WithAuth from '../components/WithAuth'
import MovieCard from '../components/MovieCard'
import InfiniteLoader from 'react-infinite-loader'

class InTheaters extends React.Component {
    constructor() {
        super()
        this.state = {
            movies: [],
            // something to keep track of what 
            // page to fetch from
            // start out on 2 because the first fetch is automatic
            fetchPage: 2,
            totalPages: 0
        }
    }
    
    componentDidMount() {
        // fetch from TMDB for now playing 
        // just the first page for now
        // implement infinite scroll after MVP
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US')
        .then(resp => resp.json())
        .then(movies => this.setState({ movies: movies.results, totalPages: movies.total_pages }))
    }

    handleVisit = () => {
        console.log('scrolling')
        // fetch next page and concat onto state
        // on the condition that the page to be fetched
        // is not greater than the total pages
        if (this.state.fetchPage > this.state.totalPages) {
            console.log('end of results')
        } else {
            console.log('searching')
            fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US&page=${this.state.fetchPage}`)
            .then(resp => resp.json())
            .then(movies => this.setState({ movies: this.state.movies.concat(movies.results)}))
            // increment fetch page for next visit
            this.setState({fetchPage: this.state.fetchPage + 1})
        }
        
    }

    routeToMoviePage = (movie) => {
        this.props.history.push(`/movies/${movie.id}`)
    }

    renderMovies = () => {
        return this.state.movies.map(movie => movie ? <MovieCard movie={movie} key={movie.id} /> : null)
    }
    
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center', marginTop: '1em', marginBottom: '1em'}}>Check Out These Movies In Theaters</h1>
                <Grid columns={6} style={{marginLeft: '0.25em', marginRight: '0.5em'}}>
                    {this.renderMovies()}
                    <InfiniteLoader onVisited={ () => this.handleVisit() } />
                </Grid>
                {this.state.fetchPage > this.state.totalPages ? <h3 style={{textAlign: 'center'}}>End of Results</h3> : <h3 style={{textAlign: 'center'}}>Loading More...</h3>}
            </div>
        )
    }
}


export default WithAuth(InTheaters)