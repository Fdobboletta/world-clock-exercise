import React from 'react'
import ClockCard from './ClockCard'

export interface ICard {
  name: string
}
interface Props {
  cards: ICard[]
  deleteTimezone: (x: string) => any
}

const ClockCardsSection = (props: Props) => (
 <div className="cards-section-container">
    <div className="cards-section">
      {props.cards
        .map((card: ICard) => {
          return (
            <ClockCard name={card.name} deleteTimezone={props.deleteTimezone} key={card.name} />
          );
        })}
    </div>
  </div>  
)

export default ClockCardsSection