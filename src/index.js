import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {ApolloClient, ApolloProvider, InMemoryCache, gql} from '@apollo/client'
import {BrowserRouter as Router} from 'react-router-dom'

//create apollo client to interact with apollo server
const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
})

//create a graphql query
const query = gql`
    query {
        allPersons {
            name,
            phone,
            address {
                street,
                city
            },
            id
        }
    }
`

//send query to the server and log the response
client.query({query}).then( (response => {
    console.log(response.data)
}))

//wrapping the App component with <ApolloProvider> gives all components access to the client
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
);