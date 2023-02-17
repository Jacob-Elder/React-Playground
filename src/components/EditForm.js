import React from 'react'
import {useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {useMutation} from '@apollo/client'
import { EDIT_PERSON } from '../queries'
import Notify from './Notify'

const EditForm = ({person, onClose}) => {
    //get person id from the url param
    const idParam = useParams().id
    const navigate = useNavigate()
    const [name, setName] = useState(person.name)
    const [phone, setPhone] = useState(person.phone ? person.phone : '')
    const [street, setStreet] = useState(person.address.street ? person.address.street : '')
    const [city, setCity] = useState(person.address.city ? person.address.city : '')
    const [id, setId] = useState(person.id.toString())
    const [error, setError] = useState(null)
    const [ updatePerson ] = useMutation(EDIT_PERSON, {
        onError: (error) => {
            //update component state on error to be displayed to user
            const errorObject = error.graphQLErrors[0]
            console.log(error)
            console.log('from onError', errorObject)
            const errorMessage = errorObject.message
            setError(errorMessage)
            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    })

    useEffect(() => {
        console.log("id from url: ", idParam)
        console.log("person prop received by edit form: ", person)
    }, [])

    const submit = (event) => {
        event.preventDefault()
        console.log("variables being sent from the edit Form: ", name, phone, street, city, id)
        updatePerson({ variables: {name, phone, street, city, id } }).then( (response) => {
            if (response.data) {
                setName('')
                setPhone('')
                setStreet('')
                setCity('')
                setError(null)
                //navigate back to homepage after form submission
                navigate("/", {replace: true})
            }
        })
    }

    return (
        <div>
            <h2>Update {person.name}</h2>
            <form onSubmit={submit}>
                Name: <input value={name} onChange={({target}) => setName(target.value)} /><br />
                Phone: <input value={phone} onChange={({target}) => setPhone(target.value)} /><br />
                Street: <input value={street} onChange={({target}) => setStreet(target.value)} /><br />
                City: <input value={city} onChange={({target}) => setCity(target.value)} /><br />
                <button type="submit">Update</button><br />
                <button type="button" onClick={() => navigate("/")}>Cancel</button>
                <Notify errorMessage={error} />
            </form>
        </div>
    )

}

export default EditForm