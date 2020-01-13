import React from 'react'
import { Card, Image, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class ReviewFeedCard extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    componentDidMount() {
        fetch(`http://localhost:3000/reviews/${this.props.review.id}`)
        .then(resp => resp.json())
        .then(reviewInfo => {
            this.setState({
                reviewUser: reviewInfo.user,
                reviewShow: reviewInfo.show
            })
            // console.log('ReviewCard', reviewInfo)
            // fetch(`http://www.omdbapi.com/?apikey=49f89f6c&i=${reviewInfo.show.imdbID}`)
            // .then(resp => resp.json())
            // .then(show => this.setState({reviewShow: show}))
        })
    }

    renderCard = () => {
        return (
            <Grid columns={2} style={{borderBottom: 'dotted red'}}>
                <Grid.Column width={5}>
                    {/* Make card clickable */}
                    <Card>
                        <Card.Content>
                            <Image src={this.state.reviewShow.poster}/>
                        </Card.Content>
                        <Card.Content>
                            <Card.Header style={{textAlign: 'center'}}>{this.state.reviewShow.title}</Card.Header>
                        </Card.Content>
                    </Card>
                </Grid.Column >
                <Grid.Column width={10} >
                    <Grid.Row style={{marginTop: '3em'}}>
                        <div style={{border: 'thin dotted black'}}>
                            <h3 style={{textAlign: 'center', marginTop: '1em', marginBottom: '1em'}}>"{this.props.review.content}"</h3>
                            <h5 style={{textAlign: 'center', marginTop: '1em', marginBottom: '1em'}}>-{this.state.reviewUser.full_name}</h5>
                        </div>
                    </Grid.Row>
                    <Grid.Row style={{marginTop: '8em'}}>
                        <Grid columns={2}>
                            <Grid.Column>
                                {/* Put a cool looking stamp here */}
                                {/* probably use one of five pics I'll create */}
                                <h3>Stamp: {this.props.review.stamp}</h3>
                            </Grid.Column>
                            <Grid.Column floated="right">
                                {/* Reformat to float right */}
                                <Card style={{maxWidth: '8em', marginLeft: '8em'}}>
                                    {/* Placeholder image for the user's prof pic */}
                                    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                                    <Card.Content>
                                        {/* Make username clickable */}
                                        <Card.Header>@{this.state.reviewUser.username}</Card.Header>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
    
    render() {
        console.log('review card state', this.state)
        return (
            this.state.reviewShow ? this.renderCard() : null
        )
    }
}

export default ReviewFeedCard