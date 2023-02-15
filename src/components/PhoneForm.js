import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_NUMBER } from '../queries.js'

const PhoneForm = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [ changeNumber ] = useMutation(EDIT_NUMBER)

    const submit = (event) => {
        event.preventDefault()
        changeNumber({ variables: {name, phone } })
        setName('')
        setPhone('')
    }


    return (
        <div>
            <h2>Update Phone Number</h2>
            <form onSubmit={submit}>
                Name: <input type="text" value={name} onChange={ ({ target }) => setName(target.value)} /><br />
                Phone: <input type="text" value={phone} onChange={ ({ target }) => setPhone(target.value)} /><br />
                <button type="submit">Update</button>
            </form>
        </div>
    )

}

export default PhoneForm