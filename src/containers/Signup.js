import React from 'react'
import pic from '../theater.jpg'
import '../NoScroll.css'
import SignupForm from '../components/SignupForm'
const sectionStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${pic})`,
    height: '100vh',
    width: '200vh'
}


class Signup extends React.Component {
    render() {
        return (
            <div className='noScroll' style={ sectionStyle } >
                {/* <Header as='h1'>ChooWatchin</Header> */}
                <SignupForm />
            </div>
        )
    }
}

export default Signup