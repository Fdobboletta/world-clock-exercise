import React from 'react';
import ClockCard from './ClockCard';

export interface ICard {
  name: string;
}
interface Props {
  cards: ICard[]
  deleteTimezone: (x: string) => any
}

export default function ClockCardsSection(props: Props) {
  
  return (
    <div className="cards-section">
      {props.cards
        .map((card: ICard) => {
          return (
            <ClockCard name={card.name} deleteTimezone={props.deleteTimezone} key={card.name}/>
          );
        })}
    </div>

  )

}