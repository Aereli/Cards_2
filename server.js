if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express")
const path = require("path")
const app = express()
const axios = require('axios')

// JUST FOR DEMO PURPOSES, PUT YOUR ACTUAL API CODE HERE
app.get('/api/demo', (request, response) => {
  response.json({
    message: "Hello from server.js"
  })
})
// END DEMO
app.get('/deck', async (request, response) => {
  try{
      let {data} = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const deckId = data.deck_id
    console.log("deckid",deckId)
    response.json(deckId)
    // response.send if you are sending an object
  } catch(e){
    console.log(e)
  } 
})

app.get('/draw', async (request, response) => {
  try{
    const deckId = await request.query.deck_id
    let {data} = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      // const drawCard = []
    // const drawCard = data.cards.map( card => (console.log(card)))
    console.log("Second api call to draw cards", data)    
  } catch(error){
    console.log(error)
  }
})
  
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')))
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

const port = process.env.PORT || 8080
app.listen(
  port,
  () => { console.log(`API listening on port ${port}...`) }
)
