import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from './screens/HomeScreen'
import ProductPage from "./screens/ProductPage";
import Cart from "./screens/Cart";
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import SignUp from "./components/SignUp";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
            <Route path='/' component={HomeScreen} exact/>
            <Route path='/product/:id' component={ProductPage}/>
            <Route path='/Cart/:id?' component={Cart}/>
            <Route path='/profile' component={Profile} />
            <Route path='/signin' component={SignIn}/>
            <Route path='/signup' component={SignUp}/>

        </Container>
  
      </main>
      <Footer />
    </Router>
    </ApolloProvider>
  )
}

export default App;

