import { useState } from 'react';
import NavSort from "./navsort";
import AnimeBoxes from "./animes";

function RightRender() {

    const [display, setDisplay] = useState(false)

    const handleDL = () => {
        setDisplay(!true)
    }

    const handleDD = () => {
        setDisplay(!false)
    }

    return (
        
        <div className="right-bar">
            <NavSort display={display} setL={handleDL} setD={handleDD}/>
              
            <AnimeBoxes display={display}/>
        </div>
        
    )
}

export default RightRender