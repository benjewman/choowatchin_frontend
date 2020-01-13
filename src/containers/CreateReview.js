import React from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Image, Form, TextArea, Radio } from 'semantic-ui-react'
import WithAuth from '../components/WithAuth'

class CreateReview extends React.Component {
    constructor() {
        super()
        this.state = {
            show: {},
            radioValue: 3
        }
    }
    
    componentDidMount() {
        // conditionally fetch using params either series or movies
        // tried passing to Redux store but broke down
        // on page refresh
        if (this.props.match.params.medium === 'movies') {
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

   renderTitle = () => {
       // conditionally render 'title' or 'name'
       // based on tv or movie
       return (
            <Grid.Row style={{marginTop: '2em'}}>
                <h1 style={{fontSize: '50px', textAlign: 'center', textDecorationLine: 'underline'}}>{this.props.match.params.medium === 'movies' ? this.state.show.title : this.state.show.name}</h1>
            </Grid.Row>
       )
   }

   renderForm = () => {
       return (
           <Grid.Row style={{marginTop: '8em'}}>
                <Form>
                    <Form.Group>
                        <Form.Field
                            control={TextArea}
                            label='This show in 60 characters or less'
                            placeholer='This show in 60 characters or less'
                            width={14}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Field
                            control={Radio}
                            label='So Bad It Hurts'
                            value='1'
                            checked={this.radioValue === '1'}
                            onChange={() => this.handleChange(1)}
                        />
                    </Form.Group>
                </Form>
           </Grid.Row>
       )
   }

   handleChange = (radioValue) => {
    //    handle radio button choice
    console.log(radioValue)
    this.setState({ radioValue: radioValue })
   }

    render() {
        console.log(this.state)
        return (
            // duct tape fix for centering this stupid header
            <Grid columns={2} centered>
                {this.renderPoster()}
                <Grid.Column>
                    <Header as="h1" style={{textAlign: 'center'}}>Create Review for: </Header>
                    {this.renderTitle()}
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
        reviewShow: state.reviewShow
    }
}

export default connect(mapStateToProps, null)(WithAuth(CreateReview))