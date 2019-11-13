import React from 'react'
import './App.css'

class App extends React.Component {
  state = { cardsObject: [], 
            deckId:     "", 
            image:      "",
            cardRemain: "", 
            cardValue:  "",
            playerTwoPile: [],
            playerTwoCardCode: "",
            newPile: []
          }


  componentDidMount(){
    fetch('/deck')
      .then(response => {return response.json()})
      .then(res => this.setState({
         deckId: res.deckId
     }))

  }

  drawCard = () => {
    fetch(`/draw?deck_id=${this.state.deckId}`)
    .then(response => {return response.json()})
    // .then( res => console.log(res.cards.map(car => car.code)))
    .then(data => this.setState({cardsObject: data.cards, cardRemain: data.remaining}))
    const images = this.state.cardsObject.map(img => img.image)
    const values = this.state.cardsObject.map(val=> val.value)
    const cardCode = this.state.cardsObject.map(card => card.code)
    this.setState({ playerTwoCardCode: cardCode})
    this.setState({ cardValue: values})
    this.setState({ image : images})
  }

  thePileGrab = () => {
    fetch(`/draw/?deck_id=${this.state.deckId}/pile/newpile/add/?cards=${this.state.playerTwoCardCode}`)
    .then(response => response.json())
    // .then(data => this.setState({deckId: data.deck_id}))
    .then(data => console.log(data))
  }

  thePileList = () => {
    fetch(`/draw/?deck_id=${this.state.deckId}/pile/newpile/list/`)
    .then(response => response.json())
    .then(res => console.log(res))
  }

  // thePileGrab = () => {
  //   fetch(`/pile/add/?cards=${this.state.playerTwoCardCode}`)
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // }

  // thePileList = () => {
  //   fetch(`/pile/list`)
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // }

  render(){
    return (
      <div id="egyptian-rat-slap">
        <nav>
          <h3>Cards Remaining: {this.state.cardRemain}</h3>
        </nav>
          <div className="center-cards">
            <div className="player-1">
              {
                <img src={this.state.image[0]} alt="card">
                </img>
              }
              <div>{this.state.cardValue[0]}</div>
            </div>
            <div className="player-2">
              {
                <img src={this.state.image[1]} alt="card">
                </img>
              } 
                <div>{this.state.cardValue[1]} </div>   
            </div>
          </div>
          <div className="draw-button-container">
            <button className="draw-button"
                    onClick={this.drawCard}> draw 
            </button>
          </div>
          <div player-2-grab>
              <button onClick={this.thePileGrab}> player 2 grab</button>
          </div>
          <div player-2-pile>
              <button onClick={this.thePileList}> player 2 pile </button>
          </div>
          <div>
              {
                // console.log(this.state.cardsObject.map(card => card.code))
              }
          </div>

     
      </div>
    )
  }
}

export default App
