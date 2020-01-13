import React from 'react'
import WithAuth from './WithAuth'

class MovieShow extends React.Component {
    constructor(props) {
        super(props) 
    }
    
    componentDidMount() {
        // use the id in movie in props
        // to fetch from TMDB
        // fetch(`https://api.themoviedb.org/3/movie/${this.props.params.id}?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US`)
        // probably need to use id in params to fetch
    }

    render() {
        // console.log(this.props.params.id)
        return <h1>Movie Show</h1>
    }
} 

export default WithAuth(MovieShow)