import { useState } from 'react'

function NavSort({ display, setL, setD }) {

    const [iconColor1, setIconColor1] = useState("#fbaa33")
    const [iconColor2, setIconColor2] = useState("#9e9eb9")

    const handleClick = (num) => {
        if (num === 1) {
            setIconColor1("#fbaa33")
            setIconColor2("#9e9eb9")
            setL()
        } else {
            setIconColor1("#9e9eb9")
            setIconColor2("#fbaa33")
            setD()
        }
    }

    return (
        <div className="row">
            <div className="nav-sort col c-12">
                <div>
                    <box-icon color={iconColor1} onClick={() => handleClick(1)} name='list-ul'></box-icon>
                    <div className="test"></div>
                    <box-icon color={iconColor2} onClick={() => handleClick(2)} type='solid' name='category'></box-icon>
                </div>
            </div>
        </div>
    )
}

export default NavSort;