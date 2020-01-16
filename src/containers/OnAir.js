import React from 'react'
import { Grid } from 'semantic-ui-react'
import TVCard from '../components/TVCard'
import WithAuth from '../components/WithAuth'
import InfiniteLoader from 'react-infinite-loader'
import InfiniteScroll from 'react-infinite-scroller'

class OnAir extends React.Component {
    constructor() {
        super()
        this.state = {
            series: [],
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
        fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US')
        .then(resp => resp.json())
        .then(series => this.setState({ series: series.results, totalPages: series.total_pages }))

        // add listener to implement infinite scrolling
        document.addEventListener('scroll', this.trackScrolling)
    }

    // this is backup for the Infinite Loader component
    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling)
    }

    // backup scenario in case Infinite Loader breaks again
    trackScrolling = () => {
        const wrappedElement = document.getElementById('onAirGrid')
        if (this.isBottom(wrappedElement)) {
            console.log('bottom reached')
        }
    }

    // part of the back up plan
    // none of these are implemented currently
    isBottom(el) {
        return (el.getBoundingClientRect().bottom <= window.innerHeight)
    }

    handleVisit = () => {
        console.log('scrolling')
        // fetch next page and concat onto state
        // on the condition that the page to be fetched
        // is not greater than the total pages
        if (this.state.fetchPage > this.state.totalPages) {
            // return <h4>End of Results</h4>
            console.log('end of results')
        } else {
            console.log('searching')
            fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US&page=${this.state.fetchPage}`)
            .then(resp => resp.json())
            .then(series => this.setState({ series: this.state.series.concat(series.results)}))
            // increment fetch page for next visit
            this.setState({fetchPage: this.state.fetchPage + 1})
        }
        
    }

    renderSeries = () => {
        return this.state.series.map(tvShow => <TVCard tvShow={tvShow} key={tvShow.id} />)
    }
    
    render() {
        console.log(this.state.series)
        return (
            <div>
                <h1 style={{textAlign: 'center', marginTop: '1em', marginBottom: '1em'}}>Check Out These Series On the Air</h1>
                <Grid id='onAirGrid' columns={6} style={{marginLeft: '0.25em', marginRight: '0.5em'}}>
                    {this.renderSeries()}
                    <InfiniteLoader onVisited={ () => this.handleVisit() } />
                </Grid>
                {this.state.fetchPage > this.state.totalPages ? <h3 style={{textAlign: 'center'}}>End of Results</h3> : <h3 style={{textAlign: 'center'}}>Loading More...</h3>}
            </div>
        )
    }
}


export default WithAuth(OnAir)