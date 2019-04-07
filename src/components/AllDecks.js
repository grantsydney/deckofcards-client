import React from "react";
import Deck from './Deck'



const AllDecks = props => {


  return (
    <div>
      <div>
          {props.allDecks ?  props.allDecks.map(d => {
            return <Deck
              key={d.id}
              deck={d}
              currentDeckId={props.currentDeckId}
              allDecks={props.allDecks}
              allDeckCards={props.allDeckCards}
              getDeckId={props.getDeckId}
            />
          }): null }
      </div>
    </div>
  )
}

export default AllDecks;
