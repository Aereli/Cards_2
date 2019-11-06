import React from 'react'
import './App.css'

class App extends React.Component {
  state = { cards: [], deckId: "", image: []}

  componentDidMount(){
    fetch('/deck')
      .then(response => {return response.json()})
      .then(data => this.setState({ deckId : data}))
  }

  drawCard = () => {
    fetch(`/draw?deck_id=${this.state.deckId}`)
    .then(response => {return response.json()})
    .then(data => this.setState({ cards : data }))
  }

  render(){
    return (
      <div id="demo">
        <h1>Hello from client/src/App.js</h1>
        <h1>{this.state.deckId}</h1>
          <div>
            {
              this.state.cards.map(val=> val.value)
            }

            {
              this.state.cards.map( sui => sui.suit )
            }
          </div>
        <button onClick={this.drawCard}>
          draw
        </button>
      </div>
    )
  }
}

export default App
