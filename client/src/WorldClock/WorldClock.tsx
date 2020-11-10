import React, { useEffect, useRef, useState } from 'react'
import useFetch from 'use-http'
import ClockCardsSection, { ICard } from '../ClockCardsSection/ClockCardsSection'
import './WorldClock.css'

const WorldClock = () => {
  const [timezones, setTimezones] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')
  const [display, setDisplay] = useState<boolean>(false)
  const [cards, setCards] = useState<ICard[]>([])
  const wrapperRef = useRef<HTMLHeadingElement>(null)
  //@ts-ignore
  const { get, put, del, response, error } = useFetch('http://localhost:4000/timezones', { cachePolicy: "no-cache" })

  useEffect(() => {
    initializeTimezones()
    getSelectedTimezones()
  }, []) // componentDidMount

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("mousedown", handleClickOutside)
    }
  })

  async function getSelectedTimezones() {
    const userCards = await get(`/db`)
    if (response.ok) setCards([...userCards.data])
  }

  async function initializeTimezones() {
    const initialTimezones = await get('/externalAPI')
    if (response.ok) setTimezones(initialTimezones.data)
  }
  async function addTimezone(selectedTimezone: string) {
    await put(`/db/${selectedTimezone}`)
    if (response.ok) await getSelectedTimezones()
    else return window.alert("Cannot add a new timezone" + error)
  }

  async function deleteTimezone(selectedTimezone: string) {
    await del(`/db/${selectedTimezone}`)
    if (response.ok) return getSelectedTimezones()
    else return window.alert("There was an error when trying to delete your timezone" + error)
  }

  const updateSearch = (timezones: string) => {
    setSearch(timezones)
    setDisplay(false)
  }

  const handleClickOutside = (event: { target: any }) => {
    const { current: wrap } = wrapperRef
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false)
    }
  }

  return (
    <div className="world-clock-container">
      <div ref={wrapperRef} className="auto-container">
        <div className="search-display-container">
         <div className="search"> 
            <input
              className="search-box"
              onClick={() => setDisplay(!display)}
              placeholder="Type to search"
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
            <input type="submit" className="search-button" onClick={() => addTimezone(search)}/>
          </div>
          {display && (
            <div className="display-container">
              <ul className="timezones-list">
                {timezones
                  .filter((timezone: string) => timezone.toLowerCase().includes(search.toLowerCase()))
                  .map((timezone: string) => {
                    return (

                      <li
                        onClick={() => updateSearch(timezone)}
                        className="option"
                        key={timezone}
                        tabIndex="0"
                      >
                        {timezone}
                      </li>
                    )
                  })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <ClockCardsSection cards={cards} deleteTimezone={deleteTimezone} />
    </div>
  )
}

export default WorldClock
