import React from 'react';
import styled from 'styled-components'

  let renderExistingCards = (allDeckCards, deckId) => {
    let numCardsRemaining = 0;
    allDeckCards.map(deckCard => {
      if(deckCard.deck_id === deckId && deckCard.drawn === false){
          numCardsRemaining += 1;
    }
  })
    return numCardsRemaining
  }




const Deck = (props) => {
  let selectDeck = (event) => {
    if(event.target.dataset.id === "2" || event.target.dataset.id === "0"){
      alert('Not enough cards to draw. Please choose another deck, or create a new one')
    } else{
      props.getDeckId(props.deck.id);
    }

  }
console.log(props);
  return (

  <div style={{border:'1px solid pink', width:'40%'}} onClick={selectDeck}>
    <p>{props.deck.id}</p>
    <p data-id={renderExistingCards(props.allDeckCards, props.deck.id)}>{renderExistingCards(props.allDeckCards, props.deck.id)}</p>



  </div>
  );
};

export default Deck;
