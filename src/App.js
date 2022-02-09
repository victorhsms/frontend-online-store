import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Home';
import Cart from './Components/Cart';

// import './App.css';

class App extends React.Component {
  render() {
    return (

      <BrowserRouter>
        <Route exact path="/" component={ Home } />
        <Route exact path="/cart" component={ Cart } />
      </BrowserRouter>

    );
  }
}

export default App;
