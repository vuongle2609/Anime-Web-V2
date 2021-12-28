import { useState, useEffect } from 'react'
import FilterBar from "./filterbar";
import RightRender from "./rightrender";

function BodyContainer() {

    const [season, setSeason] = useState()
    const [status, setstatus] = useState()
    const [genres, setGenres] = useState([])
    const [isClick, setIsClick] = useState(false)

    const seasonHandle = (value) => {
        setSeason(value)
    }

    const statusHandle = (value) => {
        setstatus(value)
    }

    const genresHandle = (value) => {
            setGenres(prev => {
                const isChecked = genres.includes(value)
                if (isChecked) {
                    return genres.filter(item => item !== value)
                } else {
                    return [...prev, value]
                }
            })      
    }

    const handleClickFilter = () => {
        setIsClick(!isClick)
        console.log(`${isClick}`)
    }

    return (
        <>
            <div className="left-container col c-3">
                <FilterBar seasonHandle={seasonHandle} handleClickFilter={handleClickFilter} statusHandle={statusHandle} genresArray={genres} genresHandle={genresHandle}/>
            </div>
            <div className="right-container col c-9">
                <RightRender />
            </div>
        </>
    )
}

export default BodyContainer