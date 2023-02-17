import React from 'react'

//component to display error messages
const Notify = ({errorMessage}) => {
    if (!errorMessage) {
      return null
    }
    return (
      <div style={{color: 'red'}}>
        {errorMessage}
      </div>
    )
  }

  export default Notify