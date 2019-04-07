import React, { Component } from 'react';
import './App.css';
import Card from './components/Card'
import Deck from './components/Deck'
import styled from 'styled-components'


//*******************STYLED COMPONENTS****************//
const NewDeckButton = styled.button`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  width:10%;
  height:7%;
  font-size:1.3em;
  color:#545B56;
  font-family: 'Kalam', cursive;
  margin:auto;
`;

const ErrorMessage = styled.div`
  font-size:1.3em;
  color:#545B56;
  font-family: 'Kalam', cursive;
  margin-top:2%;
`;

const DrawCardsButton = styled.div`
  text-align: center;
  border: 1px solid #000;
  width: 150px;
  height: 200px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  margin:auto;
  margin-top:2%;
`;


class App extends Component {

  state={
    decks:[],
    cards:[],
    currentDeckId: '',
    currentFiveCards: []
  }

  //fetch deck and card data and set State
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
  }


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
      this.createDeckCards(d.id)
      this.setState({
        currentDeckId: d.id
      })
    })

  }

  //adds new deck to decks in state, resets current cards to empty array
  addDeck = (deck) => {
    this.setState({
      decks: [...this.state.decks, deck],
      currentFiveCards: []
    })
  }


  createDeckCards = (id) => {
    fetch(`http://localhost:3000/api/v1/new?id=${id}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      })
    })
  }


  drawFiveCardsButton = () => {
    fetch(`http://localhost:3000/api/v1/deck/${this.state.currentDeckId}/draw`)
      .then(r => r.json())
      .then(deckCards => {
        this.setState({ currentFiveCards: deckCards }, ()=>console.log(this.state.currentFiveCards))
      })
  }

  displayDrawButton(deckId, currentCards) {
    if (deckId === '') {
      return 'No cards to draw, please select new deck'
    } else if(currentCards === 2){
      return 'No cards to draw, please select new deck'
    }
    else{
      return <DrawCardsButton onClick={this.drawFiveCardsButton}>draw 5 cards</DrawCardsButton>
    }
  }



  render() {
    return (
      <div className="App">

        <NewDeckButton onClick={this.newDeck}>new deck</NewDeckButton>

        <ErrorMessage>{this.displayDrawButton(this.state.currentDeckId, this.state.currentFiveCards.length)}</ErrorMessage>

        {this.state.currentFiveCards.length === 5 ?
            <Card currentCards={this.state.currentFiveCards} allCards={this.state.cards}/>
         : null}

         {this.state.decks ?
           <Deck currentDeckId={this.state.currentDeckId} allDecks={this.state.decks}/>
         : null}

      </div>
    );
  }
}

export default App;
