import React from 'react'
import WithAuth from './WithAuth'
import { Grid, Image, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setReviewShow } from '../actions/index'

class SeriesShow extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            tvShow: {}
        }
    }
    
    componentDidMount() {
        // use the id in params
        // to fetch from TMDB
        fetch(`https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US`)
        .then(resp => resp.json())
        .then(tvShow => {
            this.setState({tvShow: tvShow })
            // don't believe OMDB has tv shows
            // might have enough info from first fetch
            
            // fetch(`http://www.omdbapi.com/?apikey=49f89f6c&i=${tvShow.imdb_id}`)
            // .then(resp => resp.json())
            // .then(movie => this.setState({movieDetails: movie}))
        })
    }

    renderCreators = () => {
        // map through created by attribute to combine
        // the creators into a single string
    }

    renderNetworks = () => {
        // map through networks and combine
        // them into a string
    }

    renderGenres = () => {
        // map through genres and combine
        // them into a string
    }

    renderLastEpisode = () => {
        return (
            <Grid.Row>
                <h3 style={{textAlign: 'left', marginTop: '2em'}}>Most Recent Episode:</h3>
                <p style={{textAlign: 'right'}}>{this.state.tvShow.last_episode_to_air.name}</p>
            </Grid.Row>
        )
    }

    renderPoster = () => {
        return (
            <Grid.Column>
                <Image src={'http://image.tmdb.org/t/p/w780' + this.state.tvShow.poster_path}/>
            </Grid.Column>
        )
    }

    routeToCreate = () => {
        // dispatching show so create page 
        // can set it automatically
        this.props.setReviewShow(this.state)
        this.props.history.push(`/reviews/series/${this.state.tvShow.id}/new`)
    }
    
    renderCreateButton = () => {
        return (
            <Grid.Row style={{marginTop: '8em', textAlign: 'center'}}>
                <Button onClick={this.routeToCreate}>Create Review <Icon name="comment alternate outline"/></Button>
            </Grid.Row>
        )
    }
    
    renderTitleAndPlot = () => {
        return (
            <Grid.Column width={7}>
                <Grid.Row style={{marginTop: '2em'}}>
                    <h1 style={{fontSize: '50px', textAlign: 'center', textDecorationLine: 'underline'}}>{this.state.tvShow.name}</h1>
                </Grid.Row>
                <Grid.Row style={{marginTop: '4em'}}>
                    <p style={{fontSize: '20px'}}><strong>Plot: </strong>{this.state.tvShow.overview}</p>
                </Grid.Row>
                {this.renderCreateButton()}
            </Grid.Column>
        )
    }

    renderDetails = () => {
        return (
            <Grid.Column style={{marginTop: '3em'}} width={3}>
                <Grid.Row>
                    <h3 style={{textAlign: 'left'}}>Creators:</h3>
                    <p style={{textAlign: 'right'}}>{this.renderCreators()}</p>
                </Grid.Row>
                <Grid.Row>
                    <h3 style={{textAlign: 'left', marginTop: '2em'}}>Network:</h3>
                    <p style={{textAlign: 'right'}}>{this.renderNetworks()}</p>
                </Grid.Row>
                <Grid.Row>
                    <h3 style={{textAlign: 'left', marginTop: '2em'}}>Genres:</h3>
                    <p style={{textAlign: 'right'}}>{this.renderGenres()}</p>
                </Grid.Row>
                <Grid.Row>
                    <h3 style={{textAlign: 'left', marginTop: '2em'}}>Seasons:</h3>
                    <p style={{textAlign: 'right'}}>{this.state.tvShow.number_of_seasons}</p>
                </Grid.Row>
                <Grid.Row>
                    <h3 style={{textAlign: 'left', marginTop: '2em'}}>Episodes:</h3>
                    <p style={{textAlign: 'right'}}>{this.state.tvShow.number_of_episodes}</p>
                </Grid.Row>
                <Grid.Row>
                    <h3 style={{textAlign: 'left', marginTop: '2em'}}>First Aired:</h3>
                    <p style={{textAlign: 'right'}}>{this.state.tvShow.first_air_date}</p>
                </Grid.Row>
                {/* some series don't have last episode */}
                {this.state.tvShow.last_episode_to_air ? this.renderLastEpisode() : null}
            </Grid.Column>
        )
    }


    // might wanna refactor code below
    render() {
        console.log(this.state)
        return (
            // testing out my response 
            <Grid style={{marginLeft: '0.5em'}} columns={3}>
                {this.renderPoster()}
                {this.renderTitleAndPlot()}
                {/* Add dividers to the column below */}
                {this.renderDetails()}
            </Grid>
        )
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        setReviewShow: show => dispatch(setReviewShow(show))
    }
}

export default connect(null, mapDispatchToProps)(WithAuth(SeriesShow))