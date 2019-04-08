import React, { Component } from 'react';
import './App.css';
import Card from './components/Card'
import AllDecks from './components/AllDecks'
import styled, { keyframes } from 'styled-components'




//*******************STYLED COMPONENTS****************//
const NewDeckButton = styled.button`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  width:13%;
  height:7%;
  font-size:110%;
  color:#000;
  font-family: 'Kalam', cursive;
  margin:auto;
  :hover {
   background-color: #8DC290
 }

 :active {
  background-color: #01A009;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
`;

const ErrorMessage = styled.div`
  font-size:1.3em;
  color:#545B56;
  font-family: 'Kalam', cursive;
  margin-top:2%;
`;

const DrawCardsButton = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  width:13%;
  height:7%;
  font-size:110%;
  color:#000;
  font-family: 'Kalam', cursive;
  margin:auto;
  :hover {
   background-color: #8DC290
 }

 :active {
  background-color: #01A009;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 7s linear infinite;
  padding: 2rem 1rem;
  font-size:4em;

`;


class App extends Component {

  state={
    decks:[],
    cards:[],
    currentDeckId: '',
    currentFiveCards: [],
    deckCards:[],
    newCardAmount: true,
  }


  //***fetch data and set state***//
  componentDidMount() {
    fetch(`http://localhost:3001/api/v1/decks`)
      .then(r => r.json())
      .then(deckData => {
        this.setState({ decks: deckData })
      })

    fetch(`http://localhost:3001/api/v1/cards`)
      .then(r => r.json())
      .then(cardData => {
        this.setState({ cards: cardData })
      })

    fetch(`http://localhost:3001/api/v1/deck_cards`)
      .then(r => r.json())
      .then(dc => {
        this.setState({ deckCards: dc })
      })
    }

  //***create new deck***//
  newDeck = () => {
    // console.log("new deck!");
    fetch('http://localhost:3001/api/v1/new', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({

      })

    })
    .then(r=>r.json())
    .then(d => {
      // console.log(d.id)
      console.log(d)

      this.addDeck(d)

      this.setState({
        currentDeckId: d.id
      })

    })

  }

  //***adds new deck to decks in state, resets current cards to empty array***//
  addDeck = (deck) => {
    this.setState({
      decks: [...this.state.decks, deck],
      currentFiveCards: []
    })
  }


  //***fetch 5 random cards from current selected deck***//
  drawFiveCardsButton = () => {
    fetch(`http://localhost:3001/api/v1/deck/${this.state.currentDeckId}/draw`)
      .then(r => r.json())
      .then(deckCards => {
        this.setState({ currentFiveCards: deckCards }, ()=>console.log(this.state.currentFiveCards))
      })
  }


  //***fn to determine when to display draw button***//
  displayDrawButton(deckId, currentCards) {
    if (deckId === '') {
      return 'No cards to draw, please select an existing deck or draw a new one.'
    } else if(currentCards === 2){
      return 'No cards to draw, please select an existing deck or draw a new one.'
    } else if(deckId !== ''){
      return <DrawCardsButton onClick={this.drawFiveCardsButton}>draw 5 cards</DrawCardsButton>
    }
    else{
      return <DrawCardsButton onClick={this.drawFiveCardsButton}>draw 5 cards</DrawCardsButton>
    }
  }

  //***set current deck id in state***//
  getDeckId = clickedDeckId => {
    this.setState({
      currentDeckId: clickedDeckId
    })
  }


  render() {
    return (
      <div className="App">
        <Rotate>
        &spades;
        </Rotate>

        {this.state.decks && this.state.deckCards ?
          <AllDecks
            currentDeckId={this.state.currentDeckId} allDecks={this.state.decks} allDeckCards={this.state.deckCards} getDeckId={this.getDeckId}
            drawFiveCardsButton={this.drawFiveCardsButton}
            newCardAmount={this.newCardAmount}
           />
        : null}

        <NewDeckButton onClick={this.newDeck}>new deck</NewDeckButton>

        <ErrorMessage>{this.displayDrawButton(this.state.currentDeckId, this.state.currentFiveCards.length)}</ErrorMessage>

        {this.state.currentFiveCards.length === 5 ?
            <Card currentCards={this.state.currentFiveCards} allCards={this.state.cards}/>
         : null}



      </div>
    );
  }
}

export default App;
