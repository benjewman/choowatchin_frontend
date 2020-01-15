import React from 'react'
import { Grid } from 'semantic-ui-react'
import WithAuth from '../components/WithAuth'
import { connect } from 'react-redux'
import ShowCard from '../components/ShowCard'

class SearchPage extends React.Component {
    constructor() {
        super()
        this.state = {
            shows: []
        }
    }
    
    componentDidMount() {
        // console.log('in component did mount', this.props)
        if (this.props.search) {
            const searchString = this.props.search.replace(' ', '%20')
            fetch(`https://api.themoviedb.org/3/search/multi?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US&query=${searchString}`)
            .then(resp => resp.json())
            .then(data => this.setState({shows: data.results}))
        } else {
            console.log('no search in props')
        }
    }

    componentDidUpdate(prevProps) {
        // console.log('in component did mount', this.props)
        if (this.props.search && prevProps.search !== this.props.search) {
            const searchString = this.props.search.replace(' ', '%20')
            fetch(`https://api.themoviedb.org/3/search/multi?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US&query=${searchString}`)
            .then(resp => resp.json())
            .then(data => this.setState({shows: data.results}))
        } else {
            console.log('no search in props')
        }
    }
    
    renderShows = () => {
        // return this.state.shows.map(show => <ShowCard show={show} />)
    }

    
    render() {
        console.log(this.state)
        return (
            <Grid columns={1}>
                <Grid.Column style={{textAlign: 'center'}}>
                    <h1>Search Page</h1>
                    <Grid columns={6} style={{marginLeft: '0.25em', marginRight: '0.5em'}}>
                        {this.renderShows()}
                    </Grid>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(SearchPage)

// can't see this page