import React from 'react'
import { Grid, Image, Card } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const TVCard = (props) => {
    console.log(props)
    
    const routeToTVPage = () => {
        props.history.push(`/series/${props.tvShow.id}`)
    }
    
    return (
        <Grid.Column>
            <Card onClick={routeToTVPage}>
                <Image src={'http://image.tmdb.org/t/p/w185' + props.tvShow.poster_path}/>
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