if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express")
const path = require("path")
const app = express()
const axios = require('axios')


app.get('/deck', async (request, response) => {
  try{
      let {data} = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const deckId = data.deck_id
  const cardRemain = data.remaining
  const deckObject = {deckId, cardRemain}
    // console.log("deckid, server side",deckId)
    response.send(deckObject)
  } catch(e){
    console.log(e)
  } 
})

// app.get('/pile', async (request,  response) => {
//   try{
//     const deckId = await request.query.deck_id
//     let {data} = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/`)
//     // const newPile = data
//       response.send(data)
//     // console.log( data)
//   } catch(error){
//     console.log(error)
//   }
// })

app.get('/draw', async (request, response) => {
  try{
    const deckId = await request.query.deck_id
    let {data} = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    const cardsObject = data
    // console.log("Second api call to draw cards", cardsObject)  
    response.send(cardsObject)  
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
