import React from 'react'
import { Grid } from 'semantic-ui-react'
import TVCard from '../components/TVCard'
import WithAuth from '../components/WithAuth'
class OnAir extends React.Component {
    constructor() {
        super()
        this.state = {
            series: [],
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
        fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US')
        .then(resp => resp.json())
        .then(series => this.setState({ series: series.results }))
    }

    renderSeries = () => {
        return this.state.series.map(tvShow => <TVCard tvShow={tvShow} key={tvShow.id} />)
    }
    
    render() {
        console.log(this.state.series)
        return (
            <Grid columns={6} style={{marginLeft: '0.25em'}}>
                {this.renderSeries()}
            </Grid>
        )
    }
}


export default WithAuth(OnAir)