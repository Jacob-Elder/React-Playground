import './App.css';
//import needed dependencies
import React from 'react';
import {useState} from 'react';
import {useQuery} from '@apollo/client'
import {Routes, Route, Link, Navigate, useMatch} from 'react-router-dom'
//import gql queries to be used
import { ALL_PERSONS, FIND_PERSON } from './queries';
//import needed React components
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import EditForm from './components/EditForm';
import NavBar from './components/NavBar';
import Footer from './components/Footer';


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
  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.id}>
          {p.name}
          <Link to={`/persons/edit/${p.id}`}><button>Edit</button></Link>
        </div>
      )}
    </div>
  )
}

function App() {
  const result = useQuery(ALL_PERSONS)
  const [addingPersonStatus, setAddingPersonStatus] = useState(false)
  const [editStatus, setEditStatus] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  //useMatch hook for passing single person to the '/persons/:id' route
  const match = useMatch('/persons/edit/:id')
  const person = match
    ? result.data.allPersons.find(p => p.id.toString() === match.params.id)
    : null

  //display 'loading' while waiting for server to return persons query 
  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      {/* {Navigation Bar} */}
      {currentUser ? <NavBar user={currentUser} /> : <NavBar user={null} />}
      {/* {Set up routes and their corresponding components} */}
      <Routes>
        <Route path="/" element={<Persons persons={result.data.allPersons} />} />
        <Route path="/persons/edit/:id" element={<EditForm person={person} />} />
        <Route path="/persons/create" element={<PersonForm />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
      <Footer />
    </div>
  )
  
}

export default App;
