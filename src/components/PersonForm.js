import React from 'react'
import {useState} from 'react'
import {useMutation} from '@apollo/client'
import { ALL_PERSONS, CREATE_PERSON } from '../queries'
import Notify from './Notify'
import { useNavigate } from 'react-router-dom'

const PersonForm = ({onClose}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const [createPerson] = useMutation(CREATE_PERSON, {
        //update the cached query so ALL_PERSONS constains the new person
        refetchQueries: [ { query: ALL_PERSONS } ],
        onError: async (error) => {
            //update component state on error to be displayed to user
            const errorObject = error.graphQLErrors[0]
            console.log('from onError', errorObject)
            const errorMessage = errorObject.message
            setError(errorMessage)
        }
    })

    const submit = (event) => {
        event.preventDefault()
        //call the createPerson mutation
        createPerson({ variables : {name, phone, street, city} }).then((response) => {
            //close the form if mutation was successful
            if (response.data) {
                console.log("successfully added user: ", response.data.addPerson)
                navigate("/")
            }
        })
    }

    return (
        <div>
            <h2>Create New Person</h2>
            <form onSubmit={submit}>
                Name: <input value={name} onChange={({target}) => setName(target.value)} /><br />
                Phone: <input value={phone} onChange={({target}) => setPhone(target.value)} /><br />
                Street: <input value={street} onChange={({target}) => setStreet(target.value)} /><br />
                City: <input value={city} onChange={({target}) => setCity(target.value)} /><br />
                <button type="submit">Add</button>
                <button type="button" onClick={() => navigate("/")}>Close</button>
            </form>
            <Notify errorMessage={error} />
        </div>
    )

}

export default PersonForm