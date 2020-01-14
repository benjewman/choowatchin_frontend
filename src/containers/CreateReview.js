import React from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Image, Form, TextArea, Radio, Button } from 'semantic-ui-react'
import WithAuth from '../components/WithAuth'

class CreateReview extends React.Component {
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
            fetch(`http://localhost:3000/reviews/${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(data => this.setState({
                userReview: data.review.content,
                radioValue: data.review.stamp,
                show: data.show
            }))
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
            <Grid.Column>
                <Image centered size='large' src={'http://image.tmdb.org/t/p/w780' + this.state.show.poster_path}/>
            </Grid.Column>
       )
   }

   renderEditPoster = () => {
       return (
           <Grid.Column>
                <Image centered size='large' src={'http://image.tmdb.org/t/p/w780' + this.state.show.poster}/>
            </Grid.Column>
       )
   }

   renderTitle = () => {
       // conditionally render 'title' or 'name'
       // based on tv or movie
       return (
            <Grid.Row style={{marginTop: '2em'}}>
                <h1 style={{fontSize: '50px', textAlign: 'center', textDecorationLine: 'underline'}}>{this.props.match.params.medium === 'movies' ? this.state.show.title : this.state.show.name}</h1>
            </Grid.Row>
       )
   }

   renderEditTitle = () => {
       return (
           <Grid.Row style={{marginTop: '2em'}}>
                <h1 style={{fontSize: '50px', textAlign: 'center', textDecorationLine: 'underline'}}>{this.state.show.title}</h1>
            </Grid.Row>
       )
   }

   handlePost = () => {
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

        fetch('http://localhost:3000/reviews', fetchObj)
        .then(resp => resp.json())
        .then(data => console.log(data))

        this.props.history.push('/home')
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

        fetch(`http://localhost:3000/reviews/${this.props.match.params.id}`, fetchObj)
        .then(resp => resp.json())
        .then(message => console.log(message))

        this.props.history.push(`/profile/${this.props.user.id}`)
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
           <Grid.Row style={{marginTop: '8em'}}>
                <Form onSubmit={this.handleSubmit}>
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
                    <h2 style={{marginTop: '3em'}}>Stamp</h2>
                    <Form.Group style={{marginTop: '3em'}}>
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
                    {/* Find way to center button */}
                    <Form.Group style={{marginTop: '3em'}}>
                        <Form.Field control={Button} >Post Review</Form.Field>
                    </Form.Group>
                </Form>
           </Grid.Row>
       )
   }

   handleChange = (radioValue) => {
    //    handle radio button choice
    this.setState({ radioValue: radioValue })
   }

    render() {
        return (
            // duct tape fix for centering this stupid header
            <Grid columns={2} centered>
                {this.props.match.path === "/reviews/:id/edit" ? this.renderEditPoster() : this.renderPoster()}
                <Grid.Column>
                    <Header as="h1" style={{textAlign: 'center'}}>Create Review for: </Header>
                    {this.props.match.path === "/reviews/:id/edit" ? this.renderEditTitle() : this.renderTitle()}
                    {this.renderForm()}
                </Grid.Column>
                {/* <Grid.Column>
                </Grid.Column> */}
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(WithAuth(CreateReview))