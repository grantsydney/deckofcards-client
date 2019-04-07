import React from 'react';
import styled from 'styled-components'


const Card = (props) => {


  const CardContainer = styled.div`
  border:1px solid pink;
  height: 200px;
  width:70%;
  margin:auto;
  padding-left:10%;
  margin-top:10%;
`;


  const SingleCard = styled.div`
  text-align: center;
  border: 1px solid #000;
  width: 150px;
  height: 200px;
  margin-right:3%;
  margin-bottom:3%;
  float:left;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
`;

const TopRankRed = styled.p`
  width:5%;
  margin-left:5%;
  margin-top:0;
  font-family: 'Kalam', cursive;
  font-size: 1.7em;
  height:10%;
  color:#df1313;
`;

const TopRankBlack = styled.p`
  width:5%;
  margin-left:5%;
  margin-top:0;
  font-family: 'Kalam', cursive;
  font-size: 1.7em;
  height:10%;
  color:#000;
`;

const BottomRankRed = styled.p`
  text-align:left;
  margin-right:5%;
  margin-top:20%;
  transform: rotate(180deg);
  font-family: 'Kalam', cursive;
  font-size: 1.7em;
  color:#df1313;
`;

const BottomRankBlack = styled.p`
  text-align:left;
  margin-right:5%;
  margin-top:20%;
  transform: rotate(180deg);
  font-family: 'Kalam', cursive;
  font-size: 1.7em;
  color:#000;
`;


  return (

  <CardContainer>
  {props.allCards.map( ac => {
    return props.currentCards.map(cc => {
      if (ac.id === cc.card_id){
          return <SingleCard key={ac.id} className="card">
          {ac.suit === "Hearts" || ac.suit === "Diamonds" ? <TopRankRed>{ac.rank}</TopRankRed> : <TopRankBlack>{ac.rank}</TopRankBlack>}
          <img src={`./assets/${ac.suit}.png`} alt={ac.suit} style={{height:'40%', width:'50%'}}/>
          {ac.suit === "Hearts" || ac.suit === "Diamonds" ? <BottomRankRed>{ac.rank}</BottomRankRed> : <BottomRankBlack>{ac.rank}</BottomRankBlack>}
          </SingleCard>
      }

    })

  })}
  </CardContainer>
  );
};

export default Card;
