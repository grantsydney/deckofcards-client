import React from "react";
import Deck from './Deck'
import styled from 'styled-components'

const DeckContainer = styled.div `
  margin-top:15%;
`;


const AllDecks = props => {
  return (
    <DeckContainer>
      {props.allDecks ?  props.allDecks.map(d => {
        return <Deck
          key={d.id}
          deck={d}
          currentDeckId={props.currentDeckId}
          allDecks={props.allDecks}
          allDeckCards={props.allDeckCards}
          getDeckId={props.getDeckId}
          drawFiveCardsButton={props.drawFiveCardsButton}
        />
      }): null }
    </DeckContainer>
  )
}

export default AllDecks;
