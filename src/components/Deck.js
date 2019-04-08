import React from 'react';
import styled from 'styled-components'

//***Deck Styled Components***//

const SingleDeck = styled.div `
  text-align: center;
  border: 1px solid #000;
  width: 50px;
  height: 90px;
  margin-right:3%;
  margin-bottom:3%;
  display:inline-block;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  `;

const DeckId = styled.p `
    position:absolute;
  `;

const DrawCardsButton = styled.div `
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

//***fn to determine num cards remaining in decks that haven't been drawn***//
let renderExistingCards = (allDeckCards, deckId) => {
  let numCardsRemaining = 0;
  allDeckCards.map(deckCard => {
    if (deckCard.deck_id === deckId && deckCard.drawn === false) {
      numCardsRemaining += 1;
    }
  })
  return numCardsRemaining
}

const Deck = (props) => {

  let selectDeck = (event) => {

    if (event.target.dataset.id === "2" || event.target.dataset.id === "0") {
      alert('Not enough cards to draw. Please choose another deck, or create a new one')
    } else {

      props.getDeckId(props.deck.id);
      return <DrawCardsButton onClick={props.drawFiveCardsButton}>draw 5 cards</DrawCardsButton>
    }

  }
  console.log(props);
  return (<SingleDeck onClick={selectDeck}>

    <DeckId>{props.deck.id}</DeckId>
    <img src={`./assets/card_back.png`} alt='card_back' style={{
        height: '100%',
        width: '100%'
      }} data-id={renderExistingCards(props.allDeckCards, props.deck.id)}/>

    <p data-id={renderExistingCards(props.allDeckCards, props.deck.id)}></p>

  </SingleDeck>);
};

export default Deck;
