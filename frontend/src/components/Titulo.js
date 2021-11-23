import React from 'react'

const Titulo = ({titulo}) => {
    return (
        <div>
            <h1 style={{"color":"white", "-webkit-text-stroke":"1px black"}} className="title is-3">{titulo}</h1>
        </div>
    )
}

export default Titulo
