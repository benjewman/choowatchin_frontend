import React from 'react'
import WithAuth from './WithAuth'
import { Grid, Image } from 'semantic-ui-react'

class MovieShow extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            movie: {}
        }
    }
    
    componentDidMount() {
        // use the id in params
        // to fetch from TMDB
        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US`)
        .then(resp => resp.json())
        .then(movie => this.setState({movie: movie }))
    }



    render() {
        console.log(this.state)
        return (
            <Grid style={{marginLeft: '0.5em'}} columns={3}>
                <Grid.Column>
                    <Image src={'http://image.tmdb.org/t/p/w780' + this.state.movie.poster_path}/>
                </Grid.Column>
                <Grid.Column>
                    
                </Grid.Column>
            </Grid>
        )
    }
} 

export default WithAuth(MovieShow)