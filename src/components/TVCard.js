import React from 'react'
import { Grid, Image, Card } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const TVCard = (props) => {    
    const routeToTVPage = () => {
        props.history.push(`/series/${props.tvShow.id}`)
    }
    
    return (
        <Grid.Column>
            <Card onClick={routeToTVPage}>
                {/* Improve Quality of image on card */}
                <Image src={'http://image.tmdb.org/t/p/w780' + props.tvShow.poster_path}/>
                <Card.Content>
                    <Card.Header>
                        {props.tvShow.name}
                    </Card.Header>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

export default withRouter(TVCard)