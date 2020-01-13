import React from 'react'
import { Grid, Input, Select, Button, Icon } from 'semantic-ui-react'

class Friends extends React.Component {
    
    handleSearchSubmit = () => {
        console.log('submit button works you crazy sob')
    }
    
    renderSearchBars = () => {
        const options = [
            { key: 'your friends', text: 'Your Friends', value: 'your friends' },
            { key: 'everyone', text: 'Everyone', value: 'everyone' },
          ]
        return (
            <Grid.Column style={{textAlign: 'center', marginTop: '2em'}}>
                <Input type='text' placeholder='Search...' action>
                    <input />
                    <Select compact options={options} defaultValue='your friends' />
                    <Button onClick={this.handleSearchSubmit} type='submit'>Search</Button>
                </Input>
            </Grid.Column>
        )
    }
    
    render() {
        return (
            this.renderSearchBars()
        )
    }
}

export default Friends

{/* <Input 
                    icon='users'
                    placeholder="Find Your Friends"    

                /> */}