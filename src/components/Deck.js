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
console.log(props);
  return (

  <div style={{border:'1px solid pink', width:'40%'}}>
    <p>{props.deck.id}</p>
    <p>{renderExistingCards(props.allDeckCards, props.deck.id)}</p>



  </div>
  );
};

export default Deck;
