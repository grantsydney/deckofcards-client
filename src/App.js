import React, { Component } from 'react';
import './App.css';
import Card from './components/Card'

class App extends Component {

  state={
    decks:[],
    cards:[],
    currentDeckId: '',
    currentFiveCards: []
  }

  //fetch deck data and set State
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



  addDeck = (deck) => {
    console.log(deck);
    this.setState({
      decks: [...this.state.decks, deck],
      currentFiveCards: []
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

  createDeckCards = (id) => {
    fetch(`http://localhost:3000/api/v1/new_deck_cards?id=${id}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({

      })

    })
  }


  // drawCards = () => {
  //   fetch(`http://localhost:3000/api/v1/draw?id=${this.state.currentDeckId}`)
  //     .then(r => r.json())
  //     .then(deckData => {
  //       console.log(deckData)
  //     })
  //
  // }

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
      return <button onClick={this.drawFiveCardsButton}>draw 5 cards</button>
    }

  }

  render() {
    return (
      <div className="App">

        <button onClick={this.newDeck}>new deck</button>

        {this.displayDrawButton(this.state.currentDeckId, this.state.currentFiveCards.length)}

        {this.state.currentFiveCards.length === 5 ?
            <Card currentCards={this.state.currentFiveCards} allCards={this.state.cards}/>
         : null}

      </div>
    );
  }
}

export default App;
