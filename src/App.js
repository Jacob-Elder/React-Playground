import './App.css';
import React from 'react';
import {useState} from 'react';
import {useQuery} from '@apollo/client'
import PersonForm from './components/PersonForm';
import { ALL_PERSONS, FIND_PERSON } from './queries';
import PhoneForm from './components/PhoneForm';


//component to dispay info of a single person
const Person = ({person, onClose}) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        street : {person.address.street}<br />
        city : {person.address.city}
      </div>
      <div>
        phone : {person.phone}
      </div>
      <button onClick={onClose}>close</button>
    </div>
  )
}

//component to display persons
const Persons = ({persons}) => {
  const [nameToSearch, setNameToSearch] = useState(null)
  //run query to get info on a single person if selected
  const result = useQuery(FIND_PERSON, {
    variables: {nameToSearch},
    skip: !nameToSearch
  })
  //if single person query has been run then only display info on that person
  if (nameToSearch && result.data) {
    return (
      <Person person={result.data.findPerson} onClose={() => setNameToSearch(null)} />
    )
  }
  //else return list of all persons
  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.id}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>
            show address
          </button>
        </div>
      )}
    </div>
  )
}

function App() {
  const result = useQuery(ALL_PERSONS)
  const [addingPersonStatus, setAddingPersonStatus] = useState(false)

  if (result.loading) {
    return <div>loading...</div>
  }

  if (addingPersonStatus) {
    return <PersonForm onClose={() => setAddingPersonStatus(false)} />
  }

  return (
    <div className='App'>
      <button onClick={() => setAddingPersonStatus(true)}>Add Person</button>
      <Persons persons={result.data.allPersons} />
      <PhoneForm />
    </div>
  )
  
}

export default App;
