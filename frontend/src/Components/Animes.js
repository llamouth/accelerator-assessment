import Anime from "./Anime";
import React, {useEffect, useState} from "react"

function Animes() {
  //fetch all animes from the backend and render them as a list using the Anime component. Make sure to style the animes to look like the screenshot from the README. Feel free to use axios to grab data

  const API = process.env.REACT_APP_BASE_URL // NOT WORKING
  const [animesList, setAnimesList] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3001/animes`)
    .then( res => { 
      return res.json()
    })
    .then( res => {
      setAnimesList(res)
    })
    .catch( err => {
      console.error(err) 
    })
  },[])

  return (
    <section className="index" id="anime-list">
      {animesList.length >= 1 ? 
        animesList.map((ani, i) => {
          const { name, description} = ani
          return <Anime key={i} name={name} description={description}/>
        })
      :
        <p>No animes to display</p>
      } 
    </section>
  );
}

export default Animes;
