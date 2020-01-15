import React from 'react'
import { Grid, Image, Card } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const ShowCard = (props) => {
    
    const routeToPage = (page) => {
        if (page === 'movie') {
            props.history.push(`/movies/${props.show.id}`)
        } else {
            props.history.push(`/series/${props.show.id}`)
        }
    }
    
    return (
        // Change ShowCard for Search Page
        <Grid.Column>
            <Card onClick={() => routeToPage(props.show.media_type)}>
                {/* Improve Quality of image on card */}
                <Image src={'http://image.tmdb.org/t/p/w780' + props.show.poster_path}/>
                <Card.Content>
                    <Card.Header>
                        {props.show.media_type === 'movie' ? props.show.title : props.show.name}
                    </Card.Header>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

export default withRouter(ShowCard)