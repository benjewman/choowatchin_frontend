import React from 'react'
import WithAuth from '../components/WithAuth'
import { connect } from 'react-redux'
import { Grid, Form, Image, Button, Input } from 'semantic-ui-react'
import { setUser } from '../actions/index'
import { url } from '../urls.js'

class EditProfileMobile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            email: '',
            uploadToggle: false
        }
    }
    
    componentDidUpdate(prevProps) {
        if (parseInt(this.props.match.params.id) !== this.props.user.id) {
            this.props.history.push(`/profile/${this.props.match.params.id}`)
        }
        if (prevProps.user !== this.props.user) {
            this.setState({
                fullName: this.props.user.full_name,
                email: this.props.user.email,
                pic: this.props.user.avatar
            })
        }
    }

    changeName = (event) => {
        this.setState({fullName: event.target.value})
    }

    changeEmail = (event) => {
        this.setState({email: event.target.value})
    }

    handleSubmit = () => {
        // fetch PUT for user
        // send state

        const reqBody = {
            full_name: this.state.fullName,
            email: this.state.email
        }
        
        const reqObj = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }

        fetch(`${url}/users/${this.props.user.id}`, reqObj)
        .then(resp => resp.json())
        .then(user => this.props.setUser(user))

        this.props.history.push(`/profile/${this.props.user.id}`)
    }
    
    handleDelete = () => {
        fetch(`${url}/users/${this.props.user.id}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => console.log(data))
        
        localStorage.removeItem('token')
        this.props.history.push('/login')
    }

    handleUpload = (event) => {
        console.log(event.target.files[0])
        // this.setState({avatar: event.target.files[0]})
        const formData = new FormData()
        formData.append("user[avatar]", event.target.files[0])
        const reqObj = {
            method: 'PUT',
            body: formData
        }
        
        fetch(`${url}/users/${this.props.user.id}`, reqObj)
        .then(resp => resp.json())
        .then(user => {
            this.props.setUser(user)
            this.setState({uploadToggle: false})
        })

    }

    handleImageUpload = () => {
        return (
            <Input style={{marginLeft: 'auto', marginRight: 'auto'}} type='file' onChange={this.handleUpload}/>
        )
    }

    renderEditForm = () => {
        return (
                <Grid.Row>
                    <Form style={{marginLeft: 'auto', marginRight: 'auto'}} onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Full Name</label>
                            <input onChange={this.changeName} value={this.state.fullName} placeholder={this.props.user ? this.props.user.full_name : null} />
                            <label style={{marginTop: '1em'}}>Email</label>
                            <input onChange={this.changeEmail} value={this.state.email} placeholder={this.props.user ? this.props.user.email : null} />
                        </Form.Field>
                        <Form.Button>Update Profile</Form.Button>
                    </Form>
                </Grid.Row>
        )
    }

    cancelButton = () => {
        return <Button style={{marginLeft: 'auto', marginRight: 'auto'}} onClick={() => this.setState({uploadToggle: false})} content='Cancel' />
    }

    changePicButton = () => {
        return <Button style={{marginLeft: 'auto', marginRight: 'auto'}} onClick={() => this.setState({uploadToggle: true})} content='Change Profile Picture' />
    }
    
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Image className="marginCenter" src={this.state.pic} style={{height: '25vh', display: 'block', marginTop: '2vh'}}/>
                </Grid.Row>
                <Grid.Row style={{paddingBottom: '0vh', paddingTop: '0vh'}}>
                    {this.state.uploadToggle ? this.cancelButton() : this.changePicButton()}
                </Grid.Row>
                {this.state.uploadToggle ? this.handleImageUpload() : null}
                <Grid.Row>
                    <Button className="marginCenter" style={{color: 'red'}} onClick={this.handleDelete} content='Delete User' />
                </Grid.Row>
                <Grid.Row style={{marginLeft: 'auto', marginRight: 'auto', paddingTop: '0vh', paddingBottom: '0vh'}}>
                    <h1 className="marginCenter">Edit Profile</h1>
                </Grid.Row>
                {this.renderEditForm()}
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(EditProfileMobile))