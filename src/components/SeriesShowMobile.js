import React from 'react'
import WithAuth from './WithAuth'
import { Grid, Image, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { url } from '../urls.js'

class SeriesShowMobile extends React.Component {
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
            fetch(`${url}/shows/${tvShow.id}`)
            .then(resp => resp.json())
            .then(show => {
                if (show.error) {
                    return null
                } else if (this.props.followedReviews){
                    this.setState({allReviews: show.reviews, friendReviews: show.reviews.filter(review => this.props.followedReviews.map(review => review.id).includes(review.id))})
                } else {
                    this.setState({allReviews: show.reviews})
                }
            })
        })
    }

    renderPoster = () => {
        return (
            <Grid.Column>
                <Image src={'http://image.tmdb.org/t/p/w780' + this.state.tvShow.poster_path} style={{height: '65vh', marginLeft: 'auto', marginRight: 'auto'}}/>
            </Grid.Column>
        )
    }

    routeToCreate = () => {
        this.props.history.push(`/reviews/series/${this.state.tvShow.id}/new`)
    }
    
    renderCreateButton = () => {
        if (this.props.user) {
            return (
                <Grid.Row style={{marginTop: '2vh', textAlign: 'center'}}>
                    <Button onClick={this.routeToCreate}>Create Review <Icon name="comment alternate outline"/></Button>
                </Grid.Row>
            )
        }
    }

    renderPlot = () => {
        return (
            <Grid.Column className="fixColumn" >
                <Grid.Row >
                    <p style={{fontSize: '3vw', marginLeft: 'auto', marginRight: 'auto', width: '100vw', textAlign: 'center'}}><strong>Plot: </strong>{this.state.tvShow.overview}</p>
                </Grid.Row>
                {this.renderCreateButton()}
            </Grid.Column>
        )
    }

    // might wanna refactor code below

    // adjust poster size so it fits properly on each device
    render() {
        return (
            <React.Fragment>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <h1 style={{marginLeft: 'auto', marginRight: 'auto', fontSize: '10vw', textAlign: 'center', textDecorationLine: 'underline', width: '98vw', marginTop: '2vh'}}>{this.state.tvShow.name}</h1>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                            {this.renderPoster()}
                    </Grid.Row>
                    <Grid.Row>
                        {this.renderPlot()}
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        followedReviews: state.followedReviews,
        user: state.user
    }
}

export default connect(mapStateToProps)(WithAuth(SeriesShowMobile))