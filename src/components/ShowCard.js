import React from 'react'
import { Grid, Image, Card } from 'semantic-ui-react'

const ShowCard = (props) => {
    console.log('in the show card')
    
    const routeToMoviePage = () => {
        props.history.push(`/movies/${props.movie.id}`)
    }
    
    return (
        // Change ShowCard for Search Page
        <Grid.Column>
            <Card onClick={routeToMoviePage}>
                {/* Improve Quality of image on card */}
                <Image src={'http://image.tmdb.org/t/p/w780' + props.movie.poster_path}/>
                <Card.Content>
                    <Card.Header>
                        {props.movie.title}
                    </Card.Header>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

export default ShowCard