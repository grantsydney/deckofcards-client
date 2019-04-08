import React, { Component } from 'react';
import './App.css';
import Card from './components/Card'
import Deck from './components/Deck'
import AllDecks from './components/AllDecks'
import styled from 'styled-components'


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


class App extends Component {

  state={
    decks:[],
    cards:[],
    currentDeckId: '',
    currentFiveCards: [],
    deckCards:[],
  }


  //***fetch data and set state***//
  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/decks`)
      .then(r => r.json())
      .then(deckData => {
        this.setState({ decks: deckData }, ()=>console.log(this.state.decks))
      })

    fetch(`http://localhost:3000/api/v1/cards`)
      .then(r => r.json())
      .then(cardData => {
        this.setState({ cards: cardData }, ()=>console.log(this.state.cards))
      })

    fetch(`http://localhost:3000/api/v1/deck_cards`)
      .then(r => r.json())
      .then(dc => {
        this.setState({ deckCards: dc }, ()=>console.log(this.state.deckCards))
      })
    }

  //***create new deck***//
  newDeck = () => {
    console.log("new deck!");
    fetch('http://localhost:3000/api/v1/decks', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({

      })

    })
    .then(r=>r.json())
    .then(d => {
      console.log(d.id)
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
    fetch(`http://localhost:3000/api/v1/deck/${this.state.currentDeckId}/draw`)
      .then(r => r.json())
      .then(deckCards => {
        this.setState({ currentFiveCards: deckCards }, ()=>console.log(this.state.currentFiveCards))
      })
  }

  //***fn to determine when to display draw button***//
  displayDrawButton(deckId, currentCards) {
    if (deckId === '') {
      return 'No cards to draw, please select an existing deck or draw a new one'
    } else if(currentCards === 2){
      return 'No cards to draw, please select an existing deck or draw a new one'
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
    }, console.log(this.state.currentDeckId))
  }


  render() {
    return (
      <div className="App">

        {this.state.decks && this.state.deckCards ?
          <AllDecks
            currentDeckId={this.state.currentDeckId} allDecks={this.state.decks} allDeckCards={this.state.deckCards} getDeckId={this.getDeckId}
            drawFiveCardsButton={this.drawFiveCardsButton}
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
