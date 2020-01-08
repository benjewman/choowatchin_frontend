
import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import { withRouter } from 'react-router-dom'
import NavLogin from './NavLogin'
import NavSignup from './NavSignup'

const Navbar = (props) => {
    console.log(props.history.location.pathname)

    const renderNav = () => {
        switch (props.history.location.pathname) {
            case '/login':
                return <NavLogin />
            case '/signup':
                return <NavSignup />
            default:
                return <NavLogin />

                
        }
    }

    return (
        <div>
            {renderNav()}
        </div>
    )
}

export default withRouter(Navbar)











// const Navbar = () => {
    
//     return (
//         <Menu>
//         <Menu.Item
//           name='editorials'
//         >
//           Editorials
//         </Menu.Item>

//         <Menu.Item
//           name='reviews'
//         >
//           Reviews
//         </Menu.Item>

//         <Menu.Item
//           name='upcomingEvents'
//           onClick={this.handleItemClick}
//         >
//           Upcoming Events
//         </Menu.Item>
//       </Menu>
//     )
// }

// export default withRouter(Navbar)