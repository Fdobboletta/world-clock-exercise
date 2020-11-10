import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import useFetch from 'use-http';
import './ClockCard.css';


export default function ClockCard (prop: any) {
  const [cardData, setCardData] = useState<any>([]);
  const { del , get ,response , error, loading } = useFetch('http://localhost:4000/timezones')
  const name = prop.name;

  useEffect(() => { getCardData() }, []) // componentDidMount

  async function getCardData() {
    const timezoneData = await get(`/externalAPI/${name}`)
    if (response.ok) setCardData(timezoneData.data)
    else return console.log("There was an error when trying to GET your cards", error);
  }

  async function deleteTimezone(selectedTimezone: string) {
    await del(`/db/${selectedTimezone}`)
    if(response.ok) return console.log("Timezone deleted succesfully")
    else return console.log("There was an error when trying to delete your timezone", error);
  }
  const timezone = cardData.timezone;
  const date = dayjs(cardData.datetime).format("DD/MM/YYYY")
  const time = dayjs(cardData.datetime).format("h:mm:A")

  if (loading) return <p>loading</p>;

  return (
    <div className="card">
        <button className="card-button" onClick={() => deleteTimezone(timezone)} >x</button>
        <b className="card-content">{timezone}</b>
        <div className="card-content">{date}</div>
        <div className="card-content">{time}</div>
    </div>

  )
}