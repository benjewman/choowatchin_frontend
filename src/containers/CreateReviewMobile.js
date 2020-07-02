import React from 'react'
import { connect } from 'react-redux'
import { Grid, Image, Form, TextArea, Radio, Button } from 'semantic-ui-react'
import WithAuth from '../components/WithAuth'
import { setFollowedReviews } from '../actions/index'
import { url } from '../urls.js'

class CreateReviewMobile extends React.Component {
    constructor() {
        super()
        this.state = {
            show: {},
            radioValue: 'Meh',
            userReview: ''
        }
    }
    
    componentDidMount() {
        // conditionally fetch using params either series or movies
        // tried passing to Redux store but broke down
        // on page refresh
        if (this.props.match.path === "/reviews/:id/edit") {
            fetch(`${url}/reviews/${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.setState({
                userReview: data.content,
                radioValue: data.stamp,
                show: data.show,
                review: data
            })
        })
        } else if (this.props.match.params.medium === 'movies') {
            fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US`)
            .then(resp => resp.json())
            .then(movie => this.setState({ show: movie }))
        } else {
            fetch(`https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=ab9fca30354bfca27d3ce1ba227e7e1f&language=en-US`)
            .then(resp => resp.json())
            .then(series => this.setState({ show: series }))
        } 
    }

   renderPoster = () => {
       return (
            <Grid.Column style={{width: '40vw', marginLeft: '5vw'}}>
                <Image centered src={'http://image.tmdb.org/t/p/w780' + this.state.show.poster_path}/>
            </Grid.Column>
       )
   }

   renderEditPoster = () => {
       return (
           
                <Image style={{height: '40vh'}} centered src={'http://image.tmdb.org/t/p/w780' + this.state.show.poster}/>
            
       )
   }

   renderTitle = () => {
       // conditionally render 'title' or 'name'
       // based on tv or movie
       return (
            <Grid.Column>
                <h1 style={{fontSize: '5vh', textAlign: 'center', textDecorationLine: 'underline'}}>{this.props.match.params.medium === 'movies' ? this.state.show.title : this.state.show.name}</h1>
            </Grid.Column>
       )
   }

   renderEditTitle = () => {
       return (
            <h1 className='marginCenter' style={{fontSize: '5vh', textAlign: 'center', textDecorationLine: 'underline'}}>{this.state.show.title}</h1>    
       )
   }

   handlePost = () => {
    if (this.state.userReview.length > 60) {
        alert('review must be 60 characters or less')
    } else {
        const bodyObj = {
            show: this.state.show,
            user_id: this.props.user.id,
            content: this.state.userReview,
            stamp: this.state.radioValue,
            medium: this.props.match.params.medium
        }
            
        const fetchObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObj)
        }

        const followedReviews = this.props.followedReviews

        fetch(`${url}/reviews`, fetchObj)
        .then(resp => resp.json())
        .then(review => {
            if (review.error) {
                alert(review.error)
            } else {
                followedReviews.unshift(review)
                this.props.setFollowedReviews(followedReviews)
            }
        })
        this.props.history.push('/home')
    }
   }

   handleEdit = () => {
        const bodyObj = {
            content: this.state.userReview,
            stamp: this.state.radioValue
        }

        const fetchObj = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObj)
        }

        fetch(`${url}/reviews/${this.props.match.params.id}`, fetchObj)
        .then(resp => resp.json())
        .then(review => {
            console.log(review)
            this.props.history.push(`/profile/${this.props.user.id}`)
        })

        // this.props.history.push(`/home`)

   }
   
   handleSubmit = (event) => {
       event.preventDefault()
        //    fetch post to backend reviews 
        // to create new review for specific user
        // send form information along with movie and user info
        
        this.props.match.path === "/reviews/:id/edit" ? this.handleEdit() : this.handlePost()
        
       
    }

   handleReviewChange = (event) => {
       this.setState({ userReview: event.target.value })
   }
   
   renderForm = () => {
       return (
           <Grid.Row style={{marginLeft: '20vw', marginRight: 'auto'}}>
           
           
                <Form onSubmit={this.handleSubmit}>
                    <h2 style={{textAlign: 'center', fontSize: '3vh'}}>Stamp</h2>
                    <Form.Group style={{width: '70vw', marginBottom: '3vh'}}>
                        <Form.Field
                            control={Radio}
                            label='Awful'
                            value='1'
                            checked={this.state.radioValue === 'Awful'}
                            onChange={() => this.handleChange('Awful')}
                        />
                        <Form.Field
                            control={Radio}
                            label='Bad'
                            value='2'
                            checked={this.state.radioValue === 'Bad'}
                            onChange={() => this.handleChange('Bad')}
                        />
                        <Form.Field
                            control={Radio}
                            label='Meh'
                            value='3'
                            checked={this.state.radioValue === 'Meh'}
                            onChange={() => this.handleChange('Meh')}
                        />
                        <Form.Field
                            control={Radio}
                            label='Good'
                            value='4'
                            checked={this.state.radioValue === 'Good'}
                            onChange={() => this.handleChange('Good')}
                        />
                        <Form.Field
                            control={Radio}
                            label='Must Watch'
                            value='5'
                            checked={this.state.radioValue === 'Must Watch'}
                            onChange={() => this.handleChange('Must Watch')}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Field
                            control={TextArea}
                            label='This show in 60 characters or less'
                            placeholer='This show in 60 characters or less'
                            value={this.state.userReview}
                            onChange={this.handleReviewChange}
                            width={14}
                        />
                    </Form.Group>
                    {/* Find way to center button */}
                    <Form.Group>
                        <Form.Field control={Button} >{this.props.match.path === "/reviews/:id/edit" ? 'Update' : 'Post'} Review</Form.Field>
                    </Form.Group>
                </Form>
                {this.state.review ? <Button style={{marginTop: '0.5vh'}} onClick={this.deleteReview} content='Delete Review'/> : null }
           </Grid.Row>
       )
   }

   deleteReview = () => {
       fetch(`${url}/reviews/${this.state.review.id}`, {method: 'DELETE'})
       .then(resp => resp.json())
       .then(message => {
            console.log(message)
            this.props.history.push(`/profile/${this.props.user.id}`)
       })
   }

   handleChange = (radioValue) => {
    //    handle radio button choice
    this.setState({ radioValue: radioValue })
   }

    render() {
        return (
            // duct tape fix for centering this stupid header
            <Grid>
                <Grid.Row style={{marginTop: '2vh', paddingBottom: '0vh'}}>
                    {this.props.match.path === "/reviews/:id/edit" ? this.renderEditPoster() : this.renderPoster()}
                </Grid.Row>
                <Grid.Row style={{paddingTop: '0vh', paddingBottom: '0vh'}}>
                    {this.props.match.path === "/reviews/:id/edit" ? this.renderEditTitle() : this.renderTitle()}
                </Grid.Row>
                {this.renderForm()}
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        followedReviews: state.followedReviews
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFollowedReviews: reviews => dispatch(setFollowedReviews(reviews))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(CreateReviewMobile))