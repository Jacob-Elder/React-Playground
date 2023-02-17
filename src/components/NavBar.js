import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = (props) => {
    const user = props.user

    const style = {
        backgroundColor : 'gray'
    }

    return (
        <div style={style}>
            This is the NavBar
            <Link style={{float : 'right'}} to="/persons/create">Create New Person</Link>
        </div>
    )
}

export default NavBar