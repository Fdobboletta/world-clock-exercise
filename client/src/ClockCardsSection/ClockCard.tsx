import dayjs from 'dayjs'
//@ts-ignore
import dayjsPluginUTC from 'dayjs-plugin-utc'
import React, { useEffect, useState } from 'react'
import useFetch from 'use-http'
import './ClockCard.css'

interface IClockCardProps {
  name: string
  deleteTimezone: (x: string) => any
}

interface ICardData {
  timezone: string
  datetime: string
}

const ClockCard = (props: IClockCardProps) => {
  const [cardData, setCardData] = useState<ICardData>({ timezone: '', datetime: '' })
  //@ts-ignore
  const { get, response, error, loading } = useFetch('http://localhost:4000/timezones', { cachePolicy: "no-cache" })
  const name = props.name

  useEffect(() => {
    getCardData()
    const interval = setInterval(() => {
      getCardData()
    }, 5000)
    return () => clearInterval(interval)
  }, []);

  async function getCardData() {
    const timezoneData = await get(`/externalAPI/${name}`)
    if (response.ok) setCardData(timezoneData.data)
    else return console.log("There was an error when trying to GET your cards", error)
  }
  const timezone = cardData.timezone;
  dayjs.extend(dayjsPluginUTC)
  const date = dayjs(cardData.datetime).format("DD/MM/YYYY")
  const time = dayjs(cardData.datetime).format("h:mm:A")

  return (
    <div className="card">
      <button className="card-button" onClick={() => props.deleteTimezone(timezone)} >x</button>
      <b className="card-content">{timezone}</b>
      {loading ? (
        <div className="card-content">loading</div>
      ) : (
          <>
            <div className="card-content">{date}</div>
            <div className="card-content">{time}</div>
          </>
        )}
    </div>
  )
}

export default ClockCard