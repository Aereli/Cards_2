import React from 'react'
import './App.css'

class App extends React.Component {
  state = { cards: [], deckId: "" }

  componentDidMount(){
    fetch('/deck')
      .then(response => {return response.json()})
      .then(data => this.setState({ deckId : data}))
  }

  drawCard = () => {
    fetch(`/draw?deck_id=${this.state.deckId}`)
    .then(data => {return data.json()})
    .then(res => console.log(res))

  }

  render(){
    return (
      <div id="demo">
        <h1>Hello from client/src/App.js</h1>
        <h1>{this.state.deckId}</h1>
        <button onClick={this.drawCard}>
          draw
        </button>
      </div>
    )
  }
}

export default App
