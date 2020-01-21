import React from 'react'
import WithAuth from './WithAuth'
import { Grid, Image, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

class SeriesShow extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            tvShow: {},
            friendReviews: [],
            allReviews: [],
            reviewToggle: undefined
        }
    }

    // how to render the reviews we have in state
    
    componentDidMount() {
        // use the id in params
        // to fetch from TMDB
        fetch(`https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US`)
        .then(resp => resp.json())
        .then(tvShow => {
            this.setState({tvShow: tvShow })
            // fetch to backend to find reviews for show
            fetch(`http://localhost:3000/shows/${tvShow.id}`)
            .then(resp => resp.json())
            .then(show => {
                if (show.error) {
                    return null
                } else {
                    this.setState({allReviews: show.reviews, friendReviews: this.props.followedReviews.filter(review => review.show_id === show.id)})
                }
            })
        })
    }

    renderCategoryString = (category) => {
        // map through categories (genres, networks, and creators) and combine
        // them into a string
        const string = this.state.tvShow[category].map(thing => thing.name).join(', ')
        return string
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
        this.props.history.push(`/reviews/series/${this.state.tvShow.id}/new`)
    }
    
    renderCreateButton = () => {
        return (
            <Grid.Row style={{marginTop: '8em', textAlign: 'center'}}>
                <Button onClick={this.routeToCreate}>Create Review <Icon name="comment alternate outline"/></Button>
            </Grid.Row>
        )
    }

    renderReviewButtons = () => {
        return (
            <Grid.Row style={{marginTop: '1em', textAlign: 'center'}}>
                {this.state.reviewToggle === 'friends' ? this.renderDetailsButton() : <Button onClick={() => this.setState({reviewToggle: 'friends'})}>Friends' Reviews ({this.state.friendReviews.length})</Button>}
                {this.state.reviewToggle === 'all' ? this.renderDetailsButton() : <Button onClick={() => this.setState({reviewToggle: 'all'})}>All Reviews ({this.state.allReviews.length})</Button>}
            </Grid.Row>
        )
    }

    renderDetailsButton = () => {
        return (
            <Button onClick={() => this.setState({reviewToggle: undefined})}>Back to Details</Button>
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
                {this.renderReviewButtons()}
            </Grid.Column>
        )
    }

    renderDetails = () => {
        return (
            <Grid.Column style={{marginTop: '3em'}} width={3}>
                <Grid.Row>
                    <h3 style={{textAlign: 'left'}}>Creators:</h3>
                    <p style={{textAlign: 'right'}}>{this.state.tvShow.created_by ? this.renderCategoryString('created_by') : null}</p>
                </Grid.Row>
                <Grid.Row>
                    <h3 style={{textAlign: 'left', marginTop: '2em'}}>Network:</h3>
                    <p style={{textAlign: 'right'}}>{this.state.tvShow.networks ? this.renderCategoryString('networks') : null}</p>
                </Grid.Row>
                <Grid.Row>
                    <h3 style={{textAlign: 'left', marginTop: '2em'}}>Genres:</h3>
                    <p style={{textAlign: 'right'}}>{this.state.tvShow.genres ? this.renderCategoryString('genres') : null}</p>
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

const mapStateToProps = state => {
    return {
        followedReviews: state.followedReviews
    }
}

export default connect(mapStateToProps)(WithAuth(SeriesShow))