import React from 'react';

// import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input className="initialInput" />
          <h1
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
        </form>
      </div>
    );
  }
}

export default App;
