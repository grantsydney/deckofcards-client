import React from 'react';
import styled from 'styled-components'


const Deck = (props) => {


  return (

  <div>
  {props.allDecks.map( deck => {
    return <span>{deck.id}</span>

    })

  }
  </div>
  );
};

export default Deck;
