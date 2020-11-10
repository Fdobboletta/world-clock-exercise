import React, { useEffect, useState } from 'react';
import useFetch from 'use-http';
import ClockCard from './ClockCard';


export default function ClockCardsSection () {
  const [cards, setCards] = useState<string[]>([]);
  const { get ,response , error, loading } = useFetch('http://localhost:4000/timezones')
  
  useEffect(() => { getSelectedTimezones() }, []) // componentDidMount

  async function getSelectedTimezones() {
    const userCards = await get(`/db`)
    if (response.ok) setCards(userCards.data)
  }

  console.log("TARJETAS",cards)

  return (
    <div className="cards-section">
          {cards
            .map((card: any, i: number) => {
              return (
                <ClockCard name={card.name}/>
              );
            })}
    </div>

  )

}