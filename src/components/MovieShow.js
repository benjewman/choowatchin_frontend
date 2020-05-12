import React from 'react'
import WithAuth from './WithAuth'
import { Grid, Image, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import AwfulStamp from '../awful_stamp2.png'
import BadStamp from '../bad_stamp.jpg'
import MehStamp from '../meh_stamp.jpeg'
import GoodStamp from '../good_stamp.jpeg'
import MustWatchStamp from '../must_watch_stamp.jpeg'
import { url } from '../urls.js'

const cardStyle = {
    border: 'thin dotted black',
    marginLeft: '0.5em'
}

class MovieShow extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            movie: {},
            movieDetails: {},
            reviewToggle: undefined,
            friendReviews: [],
            allReviews: []
        }
    }

    // how to render the reviews we have in state
    
    componentDidMount() {
        // use the id in params
        // to fetch from TMDB
        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US`)
        .then(resp => resp.json())
        .then(movie => {
            this.setState({movie: movie })
            fetch(`https://www.omdbapi.com/?apikey=49f89f6c&i=${movie.imdb_id}`)
            .then(resp => resp.json())
            .then(movie => this.setState({movieDetails: movie}))

            fetch(`${url}/shows/${movie.id}`)
            .then(resp => resp.json())
            .then(show => {
                if (show.error) {
                    return null
                } else if (this.props.followedReviews) {
                    this.setState({allReviews: show.reviews, friendReviews: show.reviews.filter(review => this.props.followedReviews.map(review => review.id).includes(review.id))})
                } else {
                    this.setState({allReviews: show.reviews})
                }
            })
        })
    }

    renderMoviePoster = () => {
        return (
            <Grid.Column className="fixColumn">
                <Image src={'http://image.tmdb.org/t/p/w780' + this.state.movie.poster_path}/>
            </Grid.Column>
        )
    }

    routeToCreate = () => {
        this.props.history.push(`/reviews/movies/${this.state.movie.id}/new`)
    }
    
    renderCreateButton = () => {
        return (
            <Grid.Row style={{marginTop: '4em', textAlign: 'center'}}>
                <Button onClick={this.routeToCreate}>Create Review <Icon name="comment alternate outline"/></Button>
            </Grid.Row>
        )
    }

    renderTitleAndPlot = () => {
        return (
            <Grid.Column className="fixColumn" width={6}>
                <Grid.Row style={{marginTop: '2em'}}>
                    <h1 style={{fontSize: '50px', textAlign: 'center', textDecorationLine: 'underline'}}>{this.state.movie.title}</h1>
                </Grid.Row>
                <Grid.Row style={{marginTop: '3em'}}>
                    <h2 style={{fontSize: '30px', textAlign: 'center', fontStyle: 'italic'}}>{this.state.movie.tagline}</h2>
                </Grid.Row>
                <Grid.Row style={{marginTop: '4em'}}>
                    <p style={{fontSize: '20px'}}><strong>Plot: </strong>{this.state.movie.overview}</p>
                </Grid.Row>
                {this.renderCreateButton()}
                {this.renderReviewButtons()}
            </Grid.Column>
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

    renderDetail = (category) => {
        // DRY code alert!!!
        return (
            <Grid.Row>
                <h3 style={{textAlign: 'left', marginTop: '2em'}}>{category}:</h3>
                <p style={{textAlign: 'right'}}>{this.state.movieDetails[category]}</p>
            </Grid.Row>
        )
    }

    movieCategories = ['Director', 'Actors', 'Genre', 'Released', 'Rated', 'Runtime']

    renderMovieDetails = () => {
        return (
            <Grid.Column style={{marginTop: '3em', marginLeft: '4em'}} width={4}>
                {/* <p style={{fontSize: '20px', textAlign: 'right', marginRight: '1em'}}><strong>Release Date: </strong>{this.state.movieDetails.Released}</p> */}
                {this.movieCategories.map(category => this.renderDetail(category))}
            </Grid.Column>
        )
    }

    renderStamp = (stamp) => {
        switch(stamp) {
            case 'Awful':
                return <Image src={AwfulStamp} />
            case 'Bad':
                return <Image src={BadStamp} />
            case 'Good':
                return <Image src={GoodStamp} />
            case 'Must Watch':
                return <Image src={MustWatchStamp} />
            default:
                return <Image src={MehStamp} />
        }
    }

    renderReviewCard = (review) => {
        return (
            <Grid style={cardStyle} columns={2}>
                <Grid.Column>
                    <h4>{this.renderStamp(review.stamp)}</h4>
                    {/* make username clickable */}
                    {/* <a href={'/profile/' + user.id}>@{user.username}</a> */}
                </Grid.Column>
                <Grid.Column>
                    <Image src={review.user.avatar} wrapped  size="tiny"/>
                    <div><a href={'/profile/' + review.user.id}>@{review.user.username}</a></div>
                </Grid.Column>
            </Grid>
        )
    }

    renderFriendsReviews = () => {
        return (
            <Grid.Column className='detailScroll' style={{marginTop: '0.5em', marginLeft: '3.5em'}} width={4}>
                <Grid.Row>
                    <h3 style={{textAlign: 'center',  marginBottom: '2em'}}>Friends' Reviews</h3>
                    {this.state.friendReviews.reverse().map(review => this.renderReviewCard(review))}
                </Grid.Row>
            </Grid.Column>
        )
    }

    renderAllReviews = () => {
        return (
             <Grid.Column className='detailScroll' style={{marginTop: '0.5em', marginLeft: '3.5em'}} width={4}>
                <Grid.Row>
                    <h3 style={{textAlign: 'center', marginBottom: '2em'}}>All Reviews</h3>
                    {this.state.allReviews.reverse().map(review => this.renderReviewCard(review))}
                </Grid.Row>
            </Grid.Column>
        )
    }

    renderReviews = () => {
        if (this.state.reviewToggle === 'friends') {
            return this.renderFriendsReviews()
        } else {
            return this.renderAllReviews()
        }
    }

    // might wanna refactor code below
    render() {
        console.log(this.state)
        return (
            <Grid className="showContainer" style={{marginLeft: '0.5em'}} columns={3}>
                {this.renderMoviePoster()}
                {this.renderTitleAndPlot()}
                {/* Add dividers to the column below */}
                {this.state.reviewToggle ? this.renderReviews() : this.renderMovieDetails()}
            </Grid>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        followedReviews: state.followedReviews,
        user: state.user
    }
}

export default connect(mapStateToProps)(WithAuth(MovieShow))

