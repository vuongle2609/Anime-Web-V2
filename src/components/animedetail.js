import { useLocation } from 'react-router-dom'

function AnimeDetail () {
    const location = useLocation()
    const { id } = location.state

    return (
        <div className="row">
            
        </div>
    )
}

export default AnimeDetail