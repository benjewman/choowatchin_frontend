import React from 'react'
import { Grid, Image, Card } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const MovieCard = (props) => {
    console.log(props)
    
    const routeToMoviePage = () => {
        props.history.push(`/movies/${props.movie.id}`)
    }
    
    return (
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

export default withRouter(MovieCard)