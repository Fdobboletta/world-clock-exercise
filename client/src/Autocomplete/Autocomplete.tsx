import React, { useEffect, useRef, useState } from 'react';
import useFetch from 'use-http';
import './Autocomplete.css'


 export default function Autocomplete() {
  const [timezones, setTimezones] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [display, setDisplay] = useState<boolean>(false);
  const wrapperRef = useRef<any>(null);
  const { get, put ,response , error } = useFetch('http://localhost:4000/timezones')

  useEffect(() => { initializeTimezones() }, []) // componentDidMount
  
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });


  async function initializeTimezones() {
    const initialTimezones = await get('/externalAPI')
    if (response.ok) setTimezones(initialTimezones.data)
  }
  async function addTimezone(selectedTimezone: string) {
    await put(`/db/${selectedTimezone}`)
    if(response.ok) return console.log("Timezone added successfully")
    else return console.log("Cannot add a new timezone", error);
  }

  const updateSearch = (timezones: string) => {
    setSearch(timezones);
    setDisplay(false);
  }

  const handleClickOutside = (event: { target: any; }) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };
 return (
   <div ref={wrapperRef} className="auto-container">
     <div className="search-container">
      <input
        className="search"
        onClick={() => setDisplay(!display)}
        placeholder="Type to search"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      <button onClick={() => addTimezone(search)}> Send </button>
     </div>
      {display && (
        <div className="display-container">
          <ul className="timezones-list"> 
          {timezones
            .filter((timezone: string) => timezone.toLowerCase().includes(search.toLowerCase()))
            .map((timezone: string, i: number) => {
              return (
               
                <li
                  onClick={() => updateSearch(timezone)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  {timezone}
                </li>
              );
            })}
          </ul>
        </div>
      )}
   </div>
 )};

