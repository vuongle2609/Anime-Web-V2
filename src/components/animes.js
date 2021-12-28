import { useState, useEffect, useRef } from 'react'
import BoxAnimeDetail from './boxdetail'
import BoxAnimeList from './boxlist'

function AnimeBoxes({ display }) {
    
    const [isLoading, setIsLoading] = useState(true)
    const [dataA, setDataA] = useState('')
    const animeData = useRef(false)

    useEffect(() => {
        if (!animeData.current) {
            fetch('https://api.aniapi.com/v1/anime?genres=Romance&nsfw=true')
            .then(res => res.json())
            .then(data => {
                animeData.current = data
                animesHandle(data)
            })
            .then(setIsLoading(false))
        } else {
            animesHandle(animeData.current)
        }
        
    },[display])

    const animesHandle = (data) => {
        let status
        let season
        let genres
        let description
        const animesObj = data

        
        const htmls = animesObj.data.documents.map((anime, index) => {
            switch (anime.status) {
                case 0:
                    status = 'Finished'
                    break;
                case 1:
                    status = 'Releasing'
                    break;
                case 2:
                    status = 'Not yet released'
                    break;
                case 3:
                    status = 'Cancelled'
            }

            if (anime.descriptions.en === "" || anime.descriptions.en === null) {
                description = "This anime doesn't have an English description yet"
            } else {
                description = anime.descriptions.en
            }

            switch (anime.season_period) {
                case 0:
                    season = 'Winter'
                    break;
                case 1:
                    season = 'Spring'
                    break;
                case 2:
                    season = 'Summer'
                    break;
                case 3:
                    season = 'Fall'
                    break;
                case 4:
                    season = ''
            }

            genres = anime.genres[0] + " ," + anime.genres[1]

            return display ? 
            <BoxAnimeDetail 
                key={index}
                cover={anime.cover_image} 
                title={anime.titles.en} 
                status={status}
                genres={genres}
                season={season + ' ' + anime.season_year}
                description={description}
            /> :
            <BoxAnimeList 
                key={index}
                cover={anime.cover_image} 
                title={anime.titles.en} 
                status={status}
                season={season + ' ' + anime.season_year}
            />
        })
        setDataA(htmls)
    }
    return (
        <div className="row animes-container">
            {isLoading || dataA}
       </div>
    )
}

export default AnimeBoxes