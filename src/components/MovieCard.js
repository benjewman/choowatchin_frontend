import React from 'react'
import { Grid, Image, Card } from 'semantic-ui-react'

const MovieCard = (props) => {
    const routeToMoviePage = () => {
        props.history.push('/home')
    }
    
    return (
        <Grid.Column>
            <Card>
                <Image onClick={routeToMoviePage()} src={'http://image.tmdb.org/t/p/w185' + props.movie.poster_path}/>
                <Card.Content>
                    <Card.Header>
                        {props.movie.title}
                    </Card.Header>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

export default MovieCard