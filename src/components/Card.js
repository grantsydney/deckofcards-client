import React from 'react';


const Card = (props) => {
  return (

  <div>
  {props.allCards.map( ac => {
    return props.currentCards.map(cc => {
      if (ac.id === cc.card_id){
          return <div key={ac.id}>
          <p>{ac.rank}</p>
          <p>{ac.suit}</p>
          </div>
      }

    })




  })}
  </div>
  );
};

export default Card;
