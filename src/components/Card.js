import React from 'react';





const Card = (props) => {
  return (

  <div>
  {props.allCards.map( ac => {
    return props.currentCards.map(cc => {
      if (ac.id === cc.card_id){
          return <div key={ac.id} className="card">
          <p>{ac.rank}</p>

          <img src={`./assets/${ac.suit}.png`} alt={ac.suit} style={{height:'5%', width:'5%'}}/>
          </div>
      }

    })




  })}
  </div>
  );
};

export default Card;
