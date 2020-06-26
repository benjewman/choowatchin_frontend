import React from 'react'
import { Grid, Menu, Form } from 'semantic-ui-react'
import WithAuth from '../components/WithAuth'
import { connect } from 'react-redux'
import ShowCard from '../components/ShowCard'
import InfiniteLoader from 'react-infinite-loader'
import uuid from 'react-uuid'

// Need input bar since we don't have one on NavMobile

class SearchPageMobile extends React.Component {
    constructor() {
        super()
        this.state = {
            shows: [],
            fetchPage: 2,
            totalPages: 0,
            filter: 'all',
            search: ''
        }
    }
    
    componentDidMount() {
        if (this.props.search) {
            const searchString = this.props.search.replace(' ', '%20')
            fetch(`https://api.themoviedb.org/3/search/multi?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US&query=${searchString}&include_adult=false`)
            .then(resp => resp.json())
            .then(data => this.setState({shows: data.results.filter(result => !result.known_for_department), totalPages: data.total_pages}))
        } else {
            console.log('no search in props')
        }
    }

    componentDidUpdate(prevProps) {
        // console.log('in component did mount', this.props)
        if (this.props.search && prevProps.search !== this.props.search) {
            const searchString = this.props.search.replace(' ', '%20')
            fetch(`https://api.themoviedb.org/3/search/multi?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US&query=${searchString}&include_adult=false`)
            .then(resp => resp.json())
            // known_for_department filters out people returned in the results
            .then(data => this.setState({shows: data.results.filter(result => !result.known_for_department), totalPages: data.total_pages}))
        } else {
            console.log('no search in props')
        }
    }

    handleSearchSubmit = (event) => {
        event.preventDefault();
        const searchString = this.state.search.replace(' ', '%20')
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US&query=${searchString}&include_adult=false`)
        .then(resp => resp.json())
        .then(data => this.setState({shows: data.results.filter(result => !result.known_for_department), totalPages: data.total_pages}))
        // this.props.setSearch(this.state.search);
        // this.setState({search: ''});
        // this.props.history.push(`/search`)
    }

    handleSearchChange = event => {
        this.setState({search: event.target.value})
    }
    
    renderShows = () => {
        let filterShows
        switch (this.state.filter) {
            case 'just series':
                filterShows = this.state.shows.filter(show => show.media_type === 'tv')
                break;
            case 'just movies':
                filterShows = this.state.shows.filter(show => show.media_type === 'movie')
                break;
            default:
                filterShows = this.state.shows
        }
        console.log('filter shows', filterShows)
        return filterShows.map(show => <ShowCard show={show} key={uuid()}/>)
    }

    handleVisit = () => {
        console.log('scrolling')
        const searchString = this.props.search.replace(' ', '%20')
        // fetch next page and concat onto state
        // on the condition that the page to be fetched
        // is not greater than the total pages
        if (this.state.fetchPage > this.state.totalPages) {
        } else {
            fetch(`https://api.themoviedb.org/3/search/multi?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US&query=${searchString}&page=${this.state.fetchPage}&include_adult=false`)
            .then(resp => resp.json())
            .then(data => this.setState({ shows: this.state.shows.concat(data.results.filter(result => !result.known_for_department))}))
            // increment fetch page for next visit
            this.setState({fetchPage: this.state.fetchPage + 1})
        }
    }

    changeFilter = (filter) => {
        this.setState({filter: filter})
    }

    renderFilterMenu = () => {
        return (
            <Menu>
                <Menu.Item
                onClick={() => this.changeFilter('all')}
                name='all'
                active={this.state.filter === 'all'}
                />
                <Menu.Item
                onClick={() => this.changeFilter('just movies')}
                name='just movies'
                active={this.state.filter === 'just movies'}
                />
                <Menu.Item
                onClick={() => this.changeFilter('just series')}
                name='just series'
                active={this.state.filter === 'just series'}
                /> 
            </Menu>
        )
    }
    
    render() {
        return (
            <Grid columns={1}>
                <Grid.Column style={{textAlign: 'center', marginTop: '3vh'}}>
                    {/* <h1>Search Results for: {this.props.search}</h1> */}
                    <Form onSubmit={this.handleSearchSubmit}>
                        <Form.Input  onChange={this.handleSearchChange} value={this.state.search}  icon='search' placeholder='Search...' />
                    </Form>
                    {this.renderFilterMenu()}
                    <Grid columns={6} style={{marginLeft: '1vw', marginRight: '1vw'}}>
                        {this.renderShows()}
                        <InfiniteLoader onVisited={ () => this.handleVisit() } />
                    </Grid>
                    {this.state.fetchPage > this.state.totalPages ? <h4>End of Results</h4>: <h4>Loading More...</h4>}
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        theSearch: state.search
    }
}

export default connect(mapStateToProps)(SearchPageMobile)